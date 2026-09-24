const check = async () => {
  const res = await fetch("https://www.codechef.com/api/list/contests/all");
  const data = await res.json();
  console.log(data);
};
check();