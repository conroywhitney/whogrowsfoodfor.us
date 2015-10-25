# Eyes of Agriculture
@conroywhitney's entry to the USDA Innovation Challenge 2015 ([usdaapps.devpost.com](https://usdaapps.devpost.com))

## Goals
The aim of this project is to view the United States through the lens of
the regions that produce our food -- through the eyes of agriculture.
This includes not only where various agricultural
products are produced around the country (both crop- and animal-based),
but also to give a window into the land, communities, and lifestyle that are involved in the
production of our food here in the United States.

To that end, this project has two key pieces of functionality:
 * To allow users to view which regions around the country are involved in the production
   of specific agricultural products, and to what degrees.
 * To allow users to view metadata about production areas of a given agricultural product, such as temperatures, precipitation, and
   socioeconomics; as well as to look into projected values relating to climate change.

The goal is to allow farmers, researches, and consumers to gain a better
understanding of our food system through the lens of a particular
agricultural product.

## Data
The data used for this project can be downloaded in its original format.
Additionally, you can view the code used to transform from the public
format into the datasets in the `data` folder which is used by the
visualizations. Here are some steps to do that:

0. `npm run clean`: Start by cleaning all of the data that was packaged
   with this git repository.
1. Make any changes you want to the filters which will later remove
   certain products or options. These regular expressions can be found in the `productFilter` and `filterOption` methods of `src/product_helper.js`. Note the corresponding tests in `test/product_helper_spec.js` which will help explain how those functions are expected to behave.
1. `gulp product-list`: Download a list of all product names from
   the NASS API. Saves into `data/raw/product-list.json`.
2. `gulp product-metadata`: Download information about possible query string
   options for each product in the list (`class_desc`, `statisticcat_desc`, `unit_desc`, etc.). Saves into `data/raw/{product}/{option}.json`.
3. `gulp product-concat`: Combine all the separate raw option files into a single
   file which lists all possible option combinations. Saves into `data/raw/{product}/options.json`.
4. `gulp product-combinations`: Filter and create the [cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of all option combinations.
    These are then combined to create a `querystring` property which will be used to send a request to the [NASS QuickStats API](http://usdaapps.devpost.com/details/resources) per the contest rules. Creates a unique `name` property which is a human-readable summary of what the query represents (e.g., `lettuce_(romaine)_acres_area_harvested_county`). *Note: This step removes options which are not directly related to this application to reduce the number of query combinations.* Saves output to `data/raw/{product}/queries.json`.
5. `gulp product-jsonlint`: At this point, it's a good idea to
   sanity-check that all of the files we've been saving are indeed valid
JSON. This does not save or delete any files, just outputs any parser
errors it encounters. Ideally, there will be no output or effect. If you
see any errors, run `npm run clean` and start over.
6. `product-download`: Run each of the queries from step #4 by hitting
   the NASS QuickStats API with the `querystring`. Save the raw JSON
data directly to output file `data/raw/{product}/{query_name}.json`.
*Note: This method may fail based on timeouts from the API. For this
reason, you may need to loop between Step #6 and Step #7 a few times.*
7. `gulp product-jsonlint-clean`: Like Step #5, we run all existing
   files through `jsonlint` to find any formatting errors. However, this
time, we delete offending files so we can try re-downloading them again.
After running this step, return to Step #6 until you don't see any
output or errors in either Step #6 or Step #7. *Note: this may take a
handful of tries before it all downloads, but it will eventually
resolve and download everything.*
8. `product-clean`: Now that we have the API cached locally, filter and combine the raw query
   responses from Step #6 into smaller files which represent the
information we want to work with. Specifically, we need to know the
product name, class, and data values for National (FIPS 00000), State
(FIPS XX000), and County (FIPS XXYYY) levels. Saves to
`data/products/{product}.json`.
9. `product-combine-all`: Combine all product JSON files into one giant
   file to be included with the application. *Note: Some applications may just want a handful of
   product JSON files, or may choose to load them individually to save
time or bandwidth.* Saves to `data/products.json`.
10. `product-jsonlint`: One last time, sanity-check that all the files
    we have downloaded and transformed are indeed valid JSON objects.
This ensures that we can use any or all of these files in our
application without worring about causing any runtime parsing errors.


