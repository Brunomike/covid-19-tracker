export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  return sortedData;
};

export const buildChartData = (data,casesType="cases") => {
    const chartData=[];
    let lastDataPoint;

    //data[casesType].forEach((date) =>
    for(let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint ={
                x:date,
                y:data[casesType][date]-lastDataPoint
            }                        
            chartData.push(newDataPoint);
        }
        lastDataPoint=data[casesType][date];
    }
    return chartData;

}
