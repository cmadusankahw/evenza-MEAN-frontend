import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const sdk = new ChartsEmbedSDK({
  baseUrl: 'https://charts.mongodb.com/charts-project-0-ywcjk'
});

const chart = sdk.createChart({ chartId: '9a37a9a2-a0b2-4d5b-b0c2-92a8d8b5835f' });
chart.render(document.getElementById('chart'));
