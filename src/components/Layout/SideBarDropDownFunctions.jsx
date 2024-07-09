export const toggleProductHeight = (productsExpand, setProductsExpand) => {
  setProductsExpand(!productsExpand);
  const div = document.getElementById("products-div");
  const maxHeight = productsExpand ? "50px" : "0px";
  div.style.height = maxHeight;
};
// vibes.....>>>>>>>>>>>>>>>>>>>>>>
export const toggleVibesHeight = (vibesExpand, setvibesExpand) => {
  setvibesExpand(!vibesExpand);
  const div = document.getElementById("vibes-div");
  const maxHeight = vibesExpand ? "50px" : "0px";

  div.style.height = maxHeight;
};
export const togleflicks = (flicksExpanted, setFlicksExpanded) => {
  setFlicksExpanded(!flicksExpanted);
  const div = document.getElementById("flicks-div");
  const maxHeight = flicksExpanted ? "50px" : "0px";

  div.style.height = maxHeight;
};

//NO Heights......>>>>>>>>>>>>>>>>>>>>

export const toggleProductNoHeight = (productsExpand, setProductsExpand) => {
  const div = document.getElementById("products-div");
  const maxHeight = "0px";
  div.style.height = maxHeight;
};
export const toggleFlicksNoHeight = () => {
  const div = document.getElementById("flicks-div");
  const maxHeight = "0px";
  div.style.height = maxHeight;
};
export const toggleNoVibesHeight = () => {
  const div = document.getElementById("vibes-div");
  const maxHeight = "0px";

  div.style.height = maxHeight;
};