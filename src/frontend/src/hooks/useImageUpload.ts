import { HttpAgent } from "@icp-sdk/core/agent";
import { useState } from "react";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (
    file: File,
    onProgress?: (pct: number) => void,
  ): Promise<string> => {
    setIsUploading(true);
    try {
      const config = await loadConfig();
      const agent = new HttpAgent({ host: config.backend_host });
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const bytes = new Uint8Array(await file.arrayBuffer());
      const progressCb = onProgress
        ? (pct: number) => onProgress(pct)
        : undefined;
      const { hash } = await storageClient.putFile(bytes, progressCb);
      const url = await storageClient.getDirectURL(hash);
      return url;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
}
