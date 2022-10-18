import React from "react";
import Logo from "./components/logo";

export default {
  logo: () => <Logo />,
  pages: () => [
    {
      label: "System",
      children: [{ listKey: "User", label: "System User" }],
    },
    {
      label: "Label Management",
      children: [
        { listKey: "Block", label: "Content Block" },
        { listKey: "Card", label: "RichMore Card Content" },
        { listKey: "Menu", label: "Main Menu" },
        { listKey: "LoanServicePage", label: "Loan Service" },
        { listKey: "MT", label: "Meta Data" },
      ],
    },
    {
      label: "Content Management",
      children: [
        { listKey: "Post", label: "Post" },
        { listKey: "ValuationSubmission", label: "Valuation Submission" },
        { listKey: "ApplicationSubmission", label: "Application Submission" },        
      ],
    },
  ],
};
