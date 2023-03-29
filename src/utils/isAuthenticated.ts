export default function isAuntificated() {
  if (!localStorage.token) return;
  const jwtPayload = JSON.parse(atob(localStorage.token.split(".")[1]));
  return jwtPayload.exp > Date.now() / 1000;
}
