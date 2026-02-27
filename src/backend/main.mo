import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Lead = {
    id : Nat;
    name : Text;
    phone : Text;
    orgType : Text;
    message : Text;
    createdAt : Int;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    slug : Text;
    content : Text;
    excerpt : Text;
    author : Text;
    publishedAt : Int;
    isPublished : Bool;
  };

  type Testimonial = {
    id : Nat;
    quote : Text;
    name : Text;
    role : Text;
    organization : Text;
    isVisible : Bool;
  };

  public type UserProfile = {
    name : Text;
  };

  module BlogPost {
    public func compareByPublishedAt(a : BlogPost, b : BlogPost) : Order.Order {
      if (a.publishedAt < b.publishedAt) { #less } else if (a.publishedAt > b.publishedAt) {
        #greater;
      } else { #equal };
    };
  };

  // Define explicit variant types for responses
  type LeadResult = {
    #ok : Nat;
    #err : Text;
  };
  type PostResult = {
    #ok : Nat;
    #err : Text;
  };
  type TestimonialResult = {
    #ok : Nat;
    #err : Text;
  };
  type UpdateResult = {
    #ok : ();
    #err : Text;
  };

  var nextLeadId = 1;
  var nextPostId = 1;
  var nextTestimonialId = 1;

  let leads = Map.empty<Nat, Lead>();
  let posts = Map.empty<Nat, BlogPost>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  system func preupgrade() {
    // No need to manually sync persistent storage. All data is already persistent.
  };

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public API - no authorization needed
  public shared ({ caller }) func submitLead(name : Text, phone : Text, orgType : Text, message : Text) : async LeadResult {
    let id = nextLeadId;
    let lead : Lead = {
      id;
      name;
      phone;
      orgType;
      message;
      createdAt = Time.now();
    };
    leads.add(id, lead);
    nextLeadId += 1;
    #ok id;
  };

  // Admin-only API
  public query ({ caller }) func getLeads() : async [Lead] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    leads.values().toArray();
  };

  // Public API - no authorization needed
  public query func getPublishedPosts() : async [BlogPost] {
    posts.values().toArray().filter(func(p) { p.isPublished }).sort(BlogPost.compareByPublishedAt);
  };

  // Public API - no authorization needed
  public query func getPostBySlug(slug : Text) : async ?BlogPost {
    posts.values().toArray().find(func(p) { p.slug == slug });
  };

  // Public API - no authorization needed
  public query func getVisibleTestimonials() : async [Testimonial] {
    testimonials.values().toArray().filter(func(t) { t.isVisible });
  };

  // Admin-only API
  public shared ({ caller }) func createPost(title : Text, slug : Text, content : Text, excerpt : Text, author : Text, isPublished : Bool) : async PostResult {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let id = nextPostId;
    let post : BlogPost = {
      id;
      title;
      slug;
      content;
      excerpt;
      author;
      publishedAt = Time.now();
      isPublished;
    };
    posts.add(id, post);
    nextPostId += 1;
    #ok id;
  };

  // Admin-only API
  public shared ({ caller }) func updatePost(id : Nat, title : Text, slug : Text, content : Text, excerpt : Text, author : Text, isPublished : Bool) : async UpdateResult {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (posts.get(id)) {
      case (null) { #err "Post not found" };
      case (?post) {
        let updatedPost : BlogPost = {
          id;
          title;
          slug;
          content;
          excerpt;
          author;
          publishedAt = post.publishedAt;
          isPublished;
        };
        posts.add(id, updatedPost);
        #ok ();
      };
    };
  };

  // Admin-only API
  public shared ({ caller }) func deletePost(id : Nat) : async UpdateResult {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (posts.get(id)) {
      case (null) { #err "Post not found" };
      case (?_) {
        posts.remove(id);
        #ok ();
      };
    };
  };

  // Admin-only API
  public shared ({ caller }) func createTestimonial(quote : Text, name : Text, role : Text, organization : Text, isVisible : Bool) : async TestimonialResult {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let id = nextTestimonialId;
    let testimonial : Testimonial = {
      id;
      quote;
      name;
      role;
      organization;
      isVisible;
    };
    testimonials.add(id, testimonial);
    nextTestimonialId += 1;
    #ok id;
  };

  // Admin-only API
  public shared ({ caller }) func updateTestimonial(id : Nat, quote : Text, name : Text, role : Text, organization : Text, isVisible : Bool) : async UpdateResult {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (testimonials.get(id)) {
      case (null) { #err "Testimonial not found" };
      case (?_) {
        let updatedTestimonial : Testimonial = {
          id;
          quote;
          name;
          role;
          organization;
          isVisible;
        };
        testimonials.add(id, updatedTestimonial);
        #ok ();
      };
    };
  };

  // Admin-only API
  public shared ({ caller }) func deleteTestimonial(id : Nat) : async UpdateResult {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (testimonials.get(id)) {
      case (null) { #err "Testimonial not found" };
      case (?_) {
        testimonials.remove(id);
        #ok ();
      };
    };
  };

  // Initialize with seed data in actor constructor
  let initialTestimonials : [Testimonial] = [
    {
      id = 1;
      quote = "Tattva Innovation transformed our digital processes!";
      name = "Rajesh Kumar";
      role = "CEO";
      organization = "Kumar Industries";
      isVisible = true;
    },
    {
      id = 2;
      quote = "Exceptional service and innovative solutions.";
      name = "Priya Sharma";
      role = "CTO";
      organization = "Sharma Tech";
      isVisible = true;
    },
    {
      id = 3;
      quote = "Highly recommend Tattva for digital transformation.";
      name = "Amit Patel";
      role = "Managing Director";
      organization = "Patel Enterprises";
      isVisible = true;
    },
  ];

  let initialBlogPost : BlogPost = {
    id = 1;
    title = "Digital Transformation for Indian Businesses";
    slug = "digital-transformation-india";
    content = "Embracing digital transformation is crucial for Indian businesses to stay competitive in today's market. Tattva Innovation offers tailored solutions to help organizations innovate and thrive in the digital age.";
    excerpt = "Learn how digital transformation can benefit your business and drive growth in India.";
    author = "Tattva Innovation Team";
    publishedAt = Time.now();
    isPublished = true;
  };

  for (testimonial in initialTestimonials.values()) {
    testimonials.add(testimonial.id, testimonial);
  };
  nextTestimonialId := 4;

  posts.add(initialBlogPost.id, initialBlogPost);
  nextPostId := 2;
};
