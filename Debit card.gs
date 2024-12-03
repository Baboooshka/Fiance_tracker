class CardInfo {
  constructor(searchString, regex, dateIndex, dateFormat, merchantIndex, amountIndex) {
    this.searchString = searchString;
    this.regex = regex;
    this.dateIndex = dateIndex;
    this.dateFormat = dateFormat;
    this.merchantIndex = merchantIndex;
    this.amountIndex = amountIndex;
  }
}

// Utility function to create CardInfo objects
const createCardInfo = (searchString, regex, dateIndex, dateFormat, merchantIndex, amountIndex) => 
  new CardInfo(searchString, regex, dateIndex, dateFormat, merchantIndex, amountIndex);

const CardsMap = {
  hdfc_cc: createCardInfo(
    "from:hdfcbank.net AND subject:Alert : Update on your HDFC Bank Credit Card",
    /([0-9]+) for $([.]*) ([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)) at ([a-zA-Z0-9 $!@#$&-_.]+) on ([0-9]+(-[0-9]+)+)/,
    5, "DD-MM-YYYY", 4, 3
  ),
  hdfc_upi: createCardInfo(
    "((from:alerts@hdfcbank.net AND subject:You have done a UPI txn. Check details!) OR (from:hdfcbank.net AND subject:View: Account update for your HDFC Bank A/c))",
    /USD\.(\d+\.\d+) (has been debited from account) (\*\*\d+) (to) (.*) (on) (\d{2}-\d{2}-\d{2})/,
    7, "DD-MM-YY", 5, 1
  ),
  axis_cc: createCardInfo(
    "from:alerts@axisbank.com AND subject:Transaction alert on Axis Bank Credit Card no",
    /Card no.\s(XX\d+)\sfor\sINR\s(\d+(.\d+))?\sat\s+(.+?)\son\s*(\d+-\d+-\d+\s\d+:\d+:\d+)/,
    5, "DD-MM-YY", 4, 2
  ),
  idfc_cc: createCardInfo(
    "from:idfcfirstbank.com AND subject:Debit Alert: Your IDFC FIRST Bank Credit Card",
    /USD ([0-9]*\.[0-9]+)\s+([a-zA-Z]+\s+)+(XX[0-9]+) at ([A-Za-z0-9 @&$-_]+) on ([0-9A-Z-]+) at/,
    4, "DD-MM-YYYY", 3, 1
  ),
  icici_cc: createCardInfo(
    "from:credit_cards@icicibank.com AND subject:Transaction alert for your ICICI Bank Credit Card",
    /a transaction of $ ([0-9,.]+) on ([A-Za-z0-9 @&$-_]+). Info: (.*?). The Available Credit Limit /,
    -1, "", 3, 1
  ),
  icici_food: createCardInfo(
    "from:Prepaidcards@icicibank.com AND subject:Transaction Alert",
    /of USD ([0-9,.]+) has been done using your ICICI Bank Prepaid Card (.*?) at (.*?) on ([A-Za-z0-9 @&$-_]+). The Available /,
    4, "DD-MMM-YYYY", 3, 1
  ),
  sodexo: createCardInfo(
    "from:do-not-reply@cardinfo.sodexo.in AND subject:Transaction confirmation on your Sodexo Card",
    /(?:US |$)(\d+\.\d{2}) at (.*?). Please call/,
    -1, "", 2, 1
  ),
  citi: createCardInfo(
    "from:CitiAlert.India@citicorp.com AND subject:Transaction confirmation on your Citibank credit card",
    /USD ([0-9,.]+) spent on card \d{4} on (\d{2}-[A-Z]{3}-\d{2}) at (.*?)\. Limit available=/,
    2, "DD-MMM-YY", 3, 1
  )
};
