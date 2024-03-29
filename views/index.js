import React from "react"
import Logo from "./components/logo"

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
        { listKey: "Banner", label: "Banner" },
      ],
    },
    {
      label: "Submission",
      children: [
        { listKey: "ValuationSubmission", label: "Valuation Submission" },
        { listKey: "ApplicationSubmission", label: "Application Submission" },
        { listKey: "MortgageSubmission", label: "Mortgage Submission" },
        { listKey: "CollateralSubmission", label: "Collateral Submission" },
      ],
    },
    {
      label: "System",
      children: [{ listKey: "User", label: "System User" }],
    },
  ],
}
