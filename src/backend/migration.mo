import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
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

  type UserProfile = {
    name : Text;
  };

  type OldActor = {
    leads : Map.Map<Nat, Lead>;
    posts : Map.Map<Nat, BlogPost>;
    testimonials : Map.Map<Nat, Testimonial>;
    nextLeadId : Nat;
    nextPostId : Nat;
    nextTestimonialId : Nat;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  type NewActor = {
    leads : Map.Map<Nat, Lead>;
    posts : Map.Map<Nat, BlogPost>;
    testimonials : Map.Map<Nat, Testimonial>;
    nextLeadId : Nat;
    nextPostId : Nat;
    nextTestimonialId : Nat;
    userProfiles : Map.Map<Principal, UserProfile>;
    siteContent : Map.Map<Text, Text>;
  };

  public func run(old : OldActor) : NewActor {
    { old with siteContent = Map.empty<Text, Text>() };
  };
};
