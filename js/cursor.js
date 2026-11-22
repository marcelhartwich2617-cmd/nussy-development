if (matchMedia("(pointer: fine)").matches) {
  const el = Object.assign(document.createElement("div"), {
    id: "custom-cursor",
  });
  document.body.appendChild(el);

  let tx = -100,
    ty = -100,
    cx = tx,
    cy = ty,
    raf;
  const k = 0.1;

  const tick = () => {
    cx += (tx - cx) * k;
    cy += (ty - cy) * k;
    el.style.setProperty("--x", `${cx}px`);
    el.style.setProperty("--y", `${cy}px`);
    raf = requestAnimationFrame(tick);
  };

  addEventListener(
    "pointermove",
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add("is-visible");
      raf ??= requestAnimationFrame(tick);
    },
    { passive: true },
  );

  addEventListener("mouseleave", () => el.classList.remove("is-visible"));
}

// Keep the blend-mode cursor off videos so it never alters their picture.
if (matchMedia("(pointer: fine)").matches) {
  const cur = document.getElementById("custom-cursor");
  const isVideo = (t) => t instanceof Element && t.closest("video");
  document.addEventListener("pointerover", (e) => {
    if (cur && isVideo(e.target)) cur.classList.add("is-hidden");
  });
  document.addEventListener("pointerout", (e) => {
    if (cur && isVideo(e.target)) cur.classList.remove("is-hidden");
  });
}
