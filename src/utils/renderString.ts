const renderString = (query: string, templateString: string) => {
  const root = document.querySelector(query);
  root.innerHTML = templateString;
  return root;
};

export default renderString;
