/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { api } from "@/trpc/react";

const DashboardPage = () => {

  const { data: reposData } = api.github.getRepos.useQuery();

  useEffect(() => {
    if (reposData) {
      setRepos(reposData);
    }
  }, [reposData]);

  const [repo, setRepo] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);


  console.log(repo);
  console.log(repos);

  return (
    <SidebarProvider>
      <AppSidebar 
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/" className="text-base">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {repos.map((repo) => (
            <div key={repo.id} className="flex flex-col gap-2 border border-slate-200 rounded-md p-4">
              <h1>{repo.name}</h1>
              <p>{repo.id}</p>
              <p>{repo.description}</p>
              <p>{repo.updated_at}</p>
              <p>{repo.language}</p>
              <p>{repo.default_branch}</p>

            </div>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardPage;
