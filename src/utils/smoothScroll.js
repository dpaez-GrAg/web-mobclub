const smoothScrollTo = (e, anchorId, { callback, navigate } = {}) => {
  e.preventDefault();

  const target = document.getElementById(anchorId);

  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
    if (callback) callback();
  } else if (navigate) {
    if (callback) callback();
    navigate("/#" + anchorId);
  }
};

export { smoothScrollTo };
