import type { NewResource } from "src/types";

export async function uploadResources(resources: NewResource[]) {
  const formData = new FormData();

  for (const resource of resources) {
    formData.append("files", resource.file);
    formData.append("displayNames", resource.displayName);
  }

  const response = await fetch("http://localhost:8000/api/uploadResources", {
    method: "POST",
    body: formData,
  });

  return response.json();
}
