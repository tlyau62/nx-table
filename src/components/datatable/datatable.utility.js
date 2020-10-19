import $ from 'jquery';

/**
 * Extract data from datatable
 */
export const data = (tableData) => {
  const results = [];

  $.each(tableData, function () {
    results.push(this);
  });

  return results;
}; 