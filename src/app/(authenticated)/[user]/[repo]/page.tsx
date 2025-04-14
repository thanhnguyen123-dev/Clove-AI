/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const RepositoryPage = () => {
  const params = useParams();
  const repo = params.repo as string;

  const { user } = useAuth();
  
  const { 
    data: repoFilesData, 
    isLoading, 
    error 
  } = api.github.getRepoContent.useQuery({
    owner: user?.user_metadata?.user_name,
    repo,
  });

  // State for processed files
  const [files, setFiles] = useState<any[]>([]);
  
  // Update state when data comes in
  useEffect(() => {
    if (repoFilesData) {
      console.log("Setting files:", repoFilesData);
      setFiles(Array.isArray(repoFilesData) ? repoFilesData : []);
    }
  }, [repoFilesData]);

  if (isLoading) return <div className="p-4">Loading repository files...</div>;
  if (error) return <div className="p-4">Error loading repository: {error.message}</div>;

  return (
    <>
      <h1 className="text-2xl font-bold">Repository: {repo}</h1>
      {files.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-xl">Files in repository</h2>
          <ul className="mt-2 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="p-2 border rounded">
                <div className="font-medium">{file.name}</div>
                <div className="text-sm text-gray-600">Path: {file.path}</div>
                <div className="text-sm text-gray-600">Type: {file.type}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No files found in repository</div>
      )}
    </>
  );
}

export default RepositoryPage;