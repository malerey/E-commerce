class Helper {

    getAuthor() {
      return {
        name: "Maria Elena",
        lastname: "Rey"
      };
    }
  
    // gets amount as integer and formats decimals
  
    formatDecimals(result) {
      let unformatted_decimals = result.price.toString().split(".");
      if (!parseInt(unformatted_decimals[1])) {
        return "00";
      } else if (parseInt(unformatted_decimals[1]) < 10) {
        return parseInt(unformatted_decimals[1]) * 10;
      } else {
        return parseInt(unformatted_decimals[1]);
      }
    }
  
    //returns the matching symbol for the currency of the item
    getCurrency(currency_result, result) {
      let currency_symbol = "";
      currency_result.map(symbolmap => {
        if (symbolmap.id == result.currency_id) {
          currency_symbol = symbolmap.symbol;
        }
      });
      return currency_symbol;
    }
  
    //if the item has a predetermined set of categories, returns those as array.
    //else, maps through the available categories, chooses the one with the most results
    //and returns it as an array
    getSearchCategories(result) {
      const filtersExist = result.filters[0] ? result.filters[0] : [];
      let categories = [];
      if (filtersExist == result.filters[0]) {
        categories = filtersExist.values[0].path_from_root.map(category => {
          return category.name;
        });
      } else {
        let filterarray = [];
        result.available_filters[0].values.map(filterresults => {
          filterarray.push(filterresults);
          return filterarray;
        });
        let maxresult = filterarray[0];
        for (var i = 1; i < filterarray.length; i++) {
          if (maxresult.results <= filterarray[i].results) {
            maxresult = filterarray[i];
          }
        }
        categories = maxresult.name.split();
      }
      return categories;
    }
  };
  
  module.exports = Helper;
  