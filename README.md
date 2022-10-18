# RichMore Financial CMS

## Usage
```javascript
yarn install
// local development
yarn run local
// docker local
docker-compose build
docker-compose up
```

## Production
```javascript
yarn run build
yarn start
```

## API Sample Output
### Label內容
**http://domain/api/v1/content**
```javascript
{
   "menu":[       // 主目錄項目 （已排序）
      {
         "ordering":1,
         "label":"主頁"
      },
      {
         "ordering":2,
         "label":"關於我們"
      },
      {
         "ordering":3,
         "label":"貸款服務"
      },
      {
         "ordering":4,
         "label":"貸款步驟"
      },
      {
         "ordering":5,
         "label":"熱門文章"
      }
   ],
   "richMore":[        // 主頁「為何選擇RICHMORE」項目 （已排序）
      {
         "ordering":1,
         "label":"信心保證",
         "description":"實力雄厚專業可靠"
      },
      {
         "ordering":2,
         "label":"批核簡易快",
         "description":"免繁複文件, 不限信貸評級, 24小時特快批核"
      },
      {
         "ordering":3,
         "label":"特大貸款額",
         "description":"不設上限, 可無限次循環使用, 靈活配合您的需要"
      },
      {
         "ordering":4,
         "label":"至慳利息",
         "description":"利息特低個, 靈活還款期, 利息逐日計, 減輕利息開支"
      },
      {
         "ordering":5,
         "label":"$0 雜費",
         "description":"免手續費, 律師費, 估價費, 貸款額取足100%"
      },
      {
         "ordering":6,
         "label":"一站式貸款",
         "description":"多種貸款產品, 無論有樓無樓, 大額細額, 均可申請"
      }
   ],
   "valuation":{         // 主頁「物業估價」項目
      "title":"物業估價",
      "description":"為確保閣下的估價更準確，\n我們將根據五間估價機構作綜合評估，\n稍後將有專人回覆閣下。",
	  // T&C 1
      "otherRemark1":"本人確認已詳細閱讀，明白及同意免費網上物業估價服務之條款及細則及私隱政策。",
	  // T&C 2
      "otherRemark2":"本人接受貴公司及聯營公司、代理、商業夥伴以及電話或其他推廣方式向本人提供有關推廣資訊。",
      "ordering":1
   },
   "aboutus":{         // 關於我們頁面內容
      "title":"免TU免露面\n網上貸款快過閃電",
      "description":"Richmore finance",
      "ordering":1
   },
   "loanService":[        // 貸款服務頁面內容 （已排序）
      {
         "title":"免TU貸款",
         "description":"無需信貸紀錄",
         "ordering":1
      },
      {
         "title":"物業一按 | 二按",
         "description":"申請物業一按後想再申",
         "ordering":2
      },
      {
         "title":"中小企周轉貸款",
         "description":"老闆這身份的擔子會有幾重",
         "ordering":3
      },
      {
         "title":"私人借貸 | 循環貸款",
         "description":"想一次批核。",
         "ordering":4
      },
      {
         "title":"清卡數 | 稅貸",
         "description":"想將卡數利息",
         "ordering":5
      },
      {
         "title":"網上貸款 | 極速批核",
         "description":"想無需露面即可獲得貸款",
         "ordering":6
      }
   ],
   "loanProcess":[        // 貸款步驟頁面內容 （已排序）
      {
         "title":"了解需要",
         "description":"RICHMORE FINANCE會先了解你的需要及講解產品特色",
         "ordering":1
      },
      {
         "title":"AI批核",
         "description":"無需露面，網上進行AI批核貸款",
         "ordering":2
      },
      {
         "title":"現金到手",
         "description":"一經批核，最快15分鐘現金即時到手",
         "ordering":3
      }
   ]
}
```

### 熱門文章
**http://domain/api/v1/post**
```javascript
[
   {
      "title":"自僱人士只需簡單收入證明",
      "content":"作為咖啡店老闆的劉先。",
      "_id":"621f871df08c5f10e958b94a",
      "thumbnail":"http://localhost:3000/file/uploads/cms/621888.png",
      "banner":"http://localhost:3000/file/uploads/cms/621f8.jpg"
   },
   {
      "title":"自僱人士只需簡單收入證明",
      "content":"作為咖啡店老闆的劉先。",
      "_id":"621f871df08c5f10e958b94a",
      "thumbnail":"http://localhost:3000/file/uploads/cms/621888.png",
      "banner":"http://localhost:3000/file/uploads/cms/621f8.jpg"
   }
]
```

### 提交估價
POST **http://domain/api/v1/valuation**
```javascript
{
    "name":"Terry Chan",
    "phone":"66477981",
    "byWhatsapp":true, // 回覆方法 Whatsapp
    "byPhone":true, // 回覆方法電話
    "address":"HK 10101",
    "agreeTerms1":true, // 同意條款1
    "agreeTerms2":true, // 同意條款1
    "rate":5, // 年利率
    "amount":1000, // 貨款金額
    "installment":10000, // 每月供款
    "paymentPeriod":5 // 還款期
}
```
