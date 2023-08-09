let content = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    content.push({
      label: `我是第${i + 1}的${j + 1}条数据`,
      value: `${i} + ${j}`,
    });
  }
}

export function getDataList(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { page, query } = params;
      let data = {};
      if (!query) {
        data.content = content.slice(page * 10, page * 10 + 10);
      } else {
        const queryContent = content.filter((item) =>
          item.label.includes(query)
        );
        console.log(queryContent);
        data.content = queryContent.slice(page * 10, page * 10 + 10);
      }
      resolve(data);
    }, 1000);
  });
}
