/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import RepositoryItem from "@/components/dashboard/repository-item";

export default function DashboardPage() {
  const { data: reposData } = api.github.getRepos.useQuery();
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    if (reposData) {
      setRepos(reposData);
    }
  }, [reposData]);

  return (
    <>
      {repos.map((repo) => (
        <RepositoryItem key={repo.id} {...repo} />
      ))}
    </>
  );
}
