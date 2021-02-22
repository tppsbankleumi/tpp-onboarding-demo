  class CurrencyUtils {
    convertToSymbol(currency) {
     switch(currency){
        case "ILS":
          return '₪'
          case "USD":
            return '$'
          default: 
          return '₪'
     }
     
    }
  }
  
  const currencyUtils = new CurrencyUtils();
  
  export default currencyUtils;
  