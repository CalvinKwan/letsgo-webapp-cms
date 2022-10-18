import React from "react";
import Logo from "./components/logo";

export default {
  logo: () => <Logo />,
  pages: () => [    
    {
      label: "Label Management",
      children: [
        { listKey: "ContentBlock", label: "Content Block" },
        { listKey: "Menu", label: "Main Menu" },        
        { listKey: "mt", label: "Meta Data" },
      ],
    },
    {
      label: "Content Management",
      children: [
        { listKey: "Post", label: "Post" },        
      ],
    },{
      label: "Submission",
      children: [        
        { listKey: "ValuationSubmission", label: "Valuation Submission" },
        { listKey: "ApplicationSubmission", label: "Application Submission" },        
      ],
    },
    {
      label: "System",
      children: [{ listKey: "User", label: "System User" }],
    },
  ],
};
