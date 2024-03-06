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
    { value: "Features", label: "產品特點" },
    { value: "LoanProduct", label: "貸款產品" },
    { value: "AboutUs", label: "關於我們" },
    { value: "CrediteRating", label: "信貸全攻略" },
    { value: "QA", label: "常見問題" },
    { value: "Login", label: "登入" },
    { value: "Application", label: "立即申請" },
  ]

  const pageList = [
    { value: "Menu", label: "首頁" },
    { value: "privateloan", label: "私人貸款" },
    { value: "tu", label: "免TU貸款" },
    { value: "collateralLoan", label: "抵押品貸款" },
    { value: "mortgage", label: "物業按揭或業主貸款" },    
    { value: "creditcard", label: "結餘整合" },
    { value: "CrediteRating", label: "信貸全攻略" },
    { value: "AboutUs", label: "關於我們" },
    { value: "QA", label: "常見問題" },
    { value: "Login", label: "登入" },
    { value: "Application", label: "立即申請" },
    { value: "thankyou", label: "Thank you Page" },
  ]

  const menuList = [
    { value: "main", label: "主要" },
    { value: "loanProduct", label: "貸款產品" },
  ]

  const postCatgetoriesList = [
    { value: "loanInfo", label: "貸款資訊" },
    { value: "loanTips", label: "投資貼士" },
    { value: "manage", label: "理財百科" },
  ]
  const bannerLocationList = [
    { value: "home", label: "首頁Banner" },
    { value: "homePromote", label: "最新動態及推廣" },
    { value: "blog", label: "信貸全攻略Banner" },
  ]

  keystone.createList("Menu", {
    labelField: "Main Menu",
    labelResolver: (i) => i.label,
    fields: {
      label: { type: Text },
      url: { type: Text },
      section: { type: Select, options: menuList },
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

  keystone.createList("ApplicationSubmission", {
    labelField: "Application Submission",
    labelResolver: (i) => i.fullName,
    fields: {
      companyAddress: { type: Text },
      companyName: { type: Text },
      companyPhone: { type: Text },
      employment: { type: Text },
      industry: { type: Text },
      liveAddress: { type: Text },
      liveBlock: { type: Text },
      liveFloor: { type: Text },
      liveMethod: { type: Text },
      liveRegion: { type: Text },
      liveUnit: { type: Text },
      loanTarget: { type: Text },
      paymentTerms: { type: Text },
      position: { type: Text },
      phoneNumb: { type: Text },
      fullName: { type: Text },
      idCard: { type: Text },
      birthDate: { type: Text },
      sex: { type: Text },
      amount: { type: Text },
      occupation: { type: Text },
      payMethod: { type: Text },
      income: { type: Text },
      submissionDate: {
        type: CalendarDay,
        dateFrom: "2022-01-01",
        dateTo: "2100-01-01",
      },
      timestamp: { type: Text },
    },
    adminConfig: {
      defaultColumns:
        "fullName, phoneNumb, loanTarget,amount, idCard, birthDate,sex,occupation,payMethod,income,timestamp",
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
  keystone.createList("MortgageSubmission", {
    labelField: "Mortgage Submission",
    labelResolver: (i) => i.fullName,
    fields: {
      fullName: { type: Text },
      idCard: { type: Text },
      phoneNumb: { type: Text },
      birthDate: { type: Text },
      sex: { type: Text },
      amount: { type: Text },
      occupation: { type: Text },
      liveAddress: { type: Text },
      liveBlock: { type: Text },
      liveFloor: { type: Text },
      liveMethod: { type: Text },
      liveRegion: { type: Text },
      liveUnit: { type: Text },
      loanTarget: { type: Text },
      paymentTerms: { type: Text },
      propertyAddress: { type: Text },
      propertyBlock: { type: Text },
      propertyFloor: { type: Text },
      propertyMethod: { type: Text },
      propertyMortageState: { type: Text },
      propertyRegion: { type: Text },
      propertyUnit: { type: Text },

      submissionDate: {
        type: CalendarDay,
        dateFrom: "2022-01-01",
        dateTo: "2100-01-01",
      },
      timestamp: { type: Text },
    },
    adminConfig: {
      defaultColumns:
        "fullName, phoneNumb, loanTarget,amount, idCard, birthDate,sex,occupation,timestamp",
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
  keystone.createList("CollateralSubmission", {
    labelField: "Collateral Submission",
    labelResolver: (i) => i.fullName,
    fields: {
      fullName: { type: Text },
      idCard: { type: Text },
      phoneNumb: { type: Text },
      birthDate: { type: Text },
      sex: { type: Text },
      amount: { type: Text },
      occupation: { type: Text },
      paymentTerms: { type: Text },
      loanTarget: { type: Text },
      liveAddress: { type: Text },
      liveBlock: { type: Text },
      liveFloor: { type: Text },
      liveMethod: { type: Text },
      liveRegion: { type: Text },
      liveUnit: { type: Text },
      carType: { type: Text },
      carBrand: { type: Text },
      carBrandFactory: { type: Text },
      carColor: { type: Text },
      carMile: { type: Text },
      carFirstMile: { type: Text },
      carLuxInfo: { type: Text },
      carModel: { type: Text },
      carTypeMode: { type: Text },
      carYear: { type: Text },
      submissionDate: {
        type: CalendarDay,
        dateFrom: "2022-01-01",
        dateTo: "2100-01-01",
      },
      timestamp: { type: Text },
    },
    adminConfig: {
      defaultColumns:
        "fullName, phoneNumb, loanTarget,amount, idCard, birthDate,sex,occupation,timestamp",
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
      phone: { type: Text },
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

  keystone.createList("ValuationCalculaton", {
    labelField: "Valuation Calculaton",
    labelResolver: (i) => i.label,
    fields: {
      label: { type: Text },
      ordering: {
        type: Integer,
        default: 1,
      },
    },
    adminConfig: {
      defaultColumns: "label,ordering",
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

  keystone.createList("ContentBlock", {
    labelField: "Content Block",
    labelResolver: (i) => i.label,
    fields: {
      label: { type: Text },
      description: { type: Text, isMultiline: true },
      section: { type: Select, options: section },
      ordering: {
        type: Integer,
        default: 1,
      },
    },
    adminConfig: {
      defaultColumns: "label,description,section,ordering",
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

  keystone.createList("mt", {
    labelField: "Meta Data",
    labelResolver: (i) => i.label,
    fields: {
      label: { type: Text },
      description: { type: Text, isMultiline: true },
      metaTitle: { type: Text, isMultiline: true },
      metaDescription: { type: Text, isMultiline: true },
      metaKeywords: { type: Text, isMultiline: true },
      section: { type: Select, options: pageList },
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

  keystone.createList("Post", {
    labelResolver: (i) => i.title,
    fields: {
      title: { type: Text },
      category: { type: Select, options: postCatgetoriesList },
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
  keystone.createList("Banner", {
    labelResolver: (i) => i.title,
    fields: {
      title: { type: Text },
      location: { type: Select, options: bannerLocationList },
      linkto: { type: Text },
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
      defaultColumns: "title, Location, timestamp, ordering",
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
