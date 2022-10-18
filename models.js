const {
  Text,
  Checkbox,
  Float,
  DateTimeUtc,
  Password,
  File,
  Integer,
  Select,
  DateTime,
  CalendarDay,
} = require("@keystonejs/fields")
const { LocalFileAdapter } = require("@keystonejs/file-adapters")
const moment = require("moment")
// const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const config = require("./config")
const fileAdapter = new LocalFileAdapter(config.path.cms)
moment.locale()

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin)
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id }
}

const userIsAdminOrOwner = (auth) => {
  const isAdmin = access.userIsAdmin(auth)
  const isOwner = access.userOwnsItem(auth)
  return isAdmin ? isAdmin : isOwner
}

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner }

const beforeChangeFile = async ({ existingItem }) => {
  if (existingItem && existingItem.file) {
    await fileAdapter.delete(existingItem.file, {
      BypassGovernanceRetention: true,
    })
  }
}

module.exports = (keystone) => {
  const section = [
    { value: "application", label: "立即申請" },
    { value: "valuation", label: "物業估價" },
    { value: "aboutus", label: "關於我們" },
    { value: "loanService", label: "貸款服務" },
    { value: "loanProcess", label: "貸款步驟" },
    { value: "richMore", label: "為何選擇我們" },
  ]
  keystone.createList("ApplicationSubmission", {
    labelField: "Application Submission",
    labelResolver: (i) => i.name,
    fields: {
      name: { type: Text },
      isChatBot: { type: Checkbox },
      reason: { type: Text },
      paymethod: { type: Text },
      phone: { type: Integer },
      loanAmount: { type: Text },
      paymentPeriod: { type: Integer },
      idCard: { type: Text },
      submissionDate: {
        type: CalendarDay,
        dateFrom: "2022-01-01",
        dateTo: "2100-01-01",
      },
      timestamp: { type: Text },
    },
    adminConfig: {
      defaultColumns:
        "name,isChatBot, phone, loanAmount, paymentPeriod, idCard, timestamp",
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
  })

  keystone.createList("ValuationSubmission", {
    labelField: "Valuation Submission",
    labelResolver: (i) => i.name,
    fields: {
      name: { type: Text },
      phone: { type: Integer },
      address: { type: Text, isMultiline: true },
      agreeTerms1: { type: Checkbox },
      agreeTerms2: { type: Checkbox },
      byWhatsapp: { type: Checkbox },
      byPhone: { type: Checkbox },
      rate: { type: Integer },
      amount: { type: Float },
      paymentPeriod: { type: Integer },
      installment: { type: Float },
      submissionDate: {
        type: CalendarDay,
        dateFrom: "2022-01-01",
        dateTo: "2100-01-01",
      },
      timestamp: { type: Text },
    },
    adminConfig: {
      defaultColumns: "name, phone, byWhatsapp, byPhone, timestamp",
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
  })
  keystone.createList("Block", {
    labelField: "Content Block",
    labelResolver: (i) => i.title,
    fields: {
      title: { type: Text, isMultiline: true },
      description: { type: Text, isMultiline: true },
      metaTitle: { type: Text, isMultiline: true  },
      metaDescription: { type: Text, isMultiline: true  },
      metaKeywords: { type: Text, isMultiline: true  },
      section: { type: Select, options: section },
      ordering: {
        type: Integer,
        default: 1,
      },
    },
    adminConfig: {
      defaultColumns: "title, section, ordering",
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
  })

  keystone.createList("LoanServicePage", {
    labelField: "Loan Service",
    labelResolver: (i) => i.label,
    fields: {
      label: { type: Text },
      description: { type: Text, isMultiline: true },
      ordering: {
        type: Integer,
        default: 1,
      },
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
    adminConfig: {
      defaultColumns: "label, description, ordering",
    },
  })

  keystone.createList("MT", {
    labelField: "Meta Data",
    labelResolver: (i) => i.title,
    fields: {
      title: { type: Text  },
      description: { type: Text, isMultiline: true },
      metaTitle: { type: Text, isMultiline: true  },
      metaDescription: { type: Text, isMultiline: true  },
      metaKeywords: { type: Text, isMultiline: true  },
      ordering: {
        type: Integer,
        default: 1,
      },
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
    adminConfig: {
      defaultColumns: "label, description, ordering",
    },
  })

  keystone.createList("Card", {
    labelField: "Richmore Content Card",
    labelResolver: (i) => i.label,
    fields: {
      label: { type: Text },
      description: { type: Text },
      ordering: {
        type: Integer,
        default: 1,
      },
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
    adminConfig: {
      defaultColumns: "label, ordering",
    },
  })
  keystone.createList("Post", {
    labelResolver: (i) => i.title,
    fields: {
      title: { type: Text },
      content: { type: Text, isMultiline: true },
      thumbnail: {
        type: File,
        adapter: fileAdapter,
        hooks: {
          beforeChange: beforeChangeFile,
        },
      },
      banner: {
        type: File,
        adapter: fileAdapter,
        hooks: {
          beforeChange: beforeChangeFile,
        },
      },
      publishDate: {
        type: CalendarDay,
        dateFrom: "2022-01-01",
        dateTo: "2100-01-01",
      },
      timestamp: { type: Text },
      ordering: {
        type: Integer,
        default: 1,
      },
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
    adminConfig: {
      defaultColumns: "title, timestamp, ordering",
    },
  })
  keystone.createList("SystemSetting", {
    fields: {
      key: { type: Text },
      value: { type: Text },
      remark: { type: Text },
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
    adminConfig: {
      defaultColumns: "key, remark, value",
    },
  })
  keystone.createList("Menu", {
    fields: {
      label: { type: Text },
      ordering: {
        type: Integer,
        default: 1,
      },
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
    adminConfig: {
      defaultColumns: "label, ordering",
    },
  })
  keystone.createList("User", {
    fields: {
      name: { type: Text },
      email: {
        type: Text,
        isUnique: true,
      },
      isAdmin: {
        type: Checkbox,
        // Field-level access controls
        // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
        access: {
          update: access.userIsAdmin,
        },
      },
      password: {
        type: Password,
      },
    },
    // List-level access controls
    access: {
      read: access.userIsAdminOrOwner,
      update: access.userIsAdminOrOwner,
      create: access.userIsAdmin,
      delete: access.userIsAdmin,
      auth: true,
    },
  })
}
