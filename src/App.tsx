import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import RolePage from "./pages/RolePage.tsx";
import WorkflowPage from "./pages/WorkflowPage.tsx";
import Basics from "./pages/Basics.tsx";
import Workflows from "./pages/Workflows.tsx";
import Roles from "./pages/Roles.tsx";
import TaskTypes from "./pages/TaskTypes.tsx";
import CopilotMicrosoft365 from "./pages/CopilotMicrosoft365.tsx";
import CopilotAppPage from "./pages/CopilotAppPage.tsx";
import ResponsibleAI from "./pages/ResponsibleAI.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/task-types" element={<TaskTypes />} />
          <Route path="/copilot-microsoft-365" element={<CopilotMicrosoft365 />} />
          <Route path="/copilot-microsoft-365/:appId" element={<CopilotAppPage />} />
          <Route path="/responsible-ai" element={<ResponsibleAI />} />
          <Route path="/role/:roleId" element={<RolePage />} />
          <Route path="/workflow/:workflowId" element={<WorkflowPage />} />
          <Route path="/basics" element={<Basics />} />
          {/* Legacy paths */}
          <Route path="/governance" element={<Navigate to="/responsible-ai" replace />} />
          <Route path="/microsoft-365" element={<Navigate to="/copilot-microsoft-365" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
