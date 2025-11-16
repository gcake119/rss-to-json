// staticContent.js
export const staticPages = {
  home: {
    title: "Welcome to GCAKE.Space｜雞蛋糕的創作空間",
    description: "Podcast、電子報與前端開發作品。",
    grid: [
      {
        section: "Podcast",
        items: [
          { text: "喂喂你還好不好", href: "#podcast_1" },
          { text: "雞蛋糕孵蛋中", href: "#podcast_2" }
        ]
      },
      {
        section: "Newsletter",
        items: [
          { text: "喂喂你還好不好", href: "#newsletter_1" },
          { text: "區塊鏈文摘", href: "#newsletter_2" }
        ]
      }
    ]
  },
  works: {
    title: "Works & Resources",
    resources: [
      {
        name: "Taiwan Podcaster 龐大資訊人包",
        links: [
          { text: "連結", href: "https://sites.google.com/view/taiwanpodcast/", blank: true },
        ]
      }
    ]
  },
  about: {
    title: "About",
    avatar: { src: "img/gcake_pod.png", alt: "Avatar" },
    paragraphs: [
      "現役躁鬱症患者，有一個 podcast 、兩份電子報。",
      "運動科學（運動生物力學）研究員、區塊鏈推廣者。",
      "台灣最大免費 Podcast 製作教學網站內容編輯。"
    ],
    contact: {
      label: "邀約聯絡",
      email: "wwhowbuhow@pm.me"
    }
  },
  contact: {
    title: "Contact & Support",
    cards: [
      {
        title: "Email",
        list: [
          { type: "email", value: "wwhowbuhow@pm.me", href: "mailto:wwhowbuhow@pm.me" }
        ]
      },
      {
        title: "加密貨幣抖內",
        list: [
          { type: "external", value: "抖內頁", href: "https://gcake119.fkey.id/", blank: true },
          { type: "BTC on-chain", value: "bc1qty2qy4vp69w5yecn5m8q56zlu80yz6uh3w9whr" },
          { type: "BTC lightning", value: "gcake119@walletofsatoshi.com", href: "mailto:gcake119@walletofsatoshi.com" },
          { type: "ETH", value: "gcake119.fkey.eth" },
          { type: "ADA handle", value: "$gcake119" },
          { type: "TEZ", value: "gcake119.tez" }
        ]
      },
      {
        title: "硬體錢包推薦連結",
        list: [
          { value: "Ledger", href: "https://shop.ledger.com/pages/referral-program?referral_code=NNS6VK4T6YRFP", blank: true },
          { value: "Trezor", href: "https://affil.trezor.io/SHh5", blank: true },
          { value: "CoolWallet", href: "https://www.coolwallet.io/products/coolwallet-pro/?ref=zta0ymf", blank: true }
        ]
      }
    ]
  }
};
