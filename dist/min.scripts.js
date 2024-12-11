let pokemonRepository = (function () {
  let e = [],
    t = document.querySelector("#modal-container");
  function n(t) {
    e.push(t);
  }
  function i() {
    return e;
  }
  function l() {
    let e = document.querySelector(".loading-text");
    e && (e.style.display = "block");
  }
  function a() {
    let e = document.querySelector(".loading-text");
    e && (e.style.display = "none");
  }
  function o(e) {
    return (
      l(),
      fetch(e.detailsUrl)
        .then(function (e) {
          return a(), e.json();
        })
        .then(function (t) {
          var n;
          return (
            (e.imageUrlFront = t.sprites.front_default),
            (e.imageUrlBack = t.sprites.back_default),
            (e.types = t.types.map((e) => e.type.name)),
            (e.abilities = t.abilities.map((e) => e.ability.name)),
            (e.height = t.height),
            (e.weight = t.weight),
            fetch((n = e).detailsUrl.replace("/pokemon/", "/pokemon-species/"))
              .then(function (e) {
                return e.json();
              })
              .then(function (e) {
                let t = e.flavor_text_entries.find(
                  (e) => "en" === e.language.name
                );
                n.flavorText = t ? t.flavor_text : "No flavor text available.";
              })
              .catch(function (e) {
                console.error(e);
              })
          );
        })
        .catch(function (e) {
          a(), console.error(e);
        })
    );
  }
  function r(e) {
    l();
    let t = pokemonRepository.getAll(),
      n = t.filter((t) => t.name.toLowerCase().includes(e.toLowerCase())),
      i = document.querySelector(".pokemon-list"),
      o = document.querySelector("#no-results-message");
    (i.innerHTML = ""),
      n.length > 0
        ? (o.classList.add("hidden"),
          n.forEach((e) => {
            p(e);
          }))
        : o.classList.remove("hidden"),
      a();
  }
  let c = document.querySelector("#search");
  c.addEventListener("input", function () {
    let e = c.value;
    r(e);
  });
  let s = document.querySelector("#search-go");
  s.addEventListener("click", function () {
    let e = c.value;
    r(e);
  });
  let d = document.querySelector("#clear-search");
  function p(e) {
    let t = document.querySelector(".pokemon-list"),
      n = document.createElement("li"),
      i = document.createElement("button");
    (i.innerText = e.name),
      i.classList.add("button-class"),
      o(e)
        .then(function () {
          let l = document.createElement("img");
          if (
            ((l.src = e.imageUrlFront),
            (l.alt = e.name),
            l.classList.add("button-img"),
            i.appendChild(l),
            e.types.length > 1)
          ) {
            let a = u(e.types[0]),
              o = u(e.types[1]);
            (i.style.background = `linear-gradient(to right, ${a} 50%, ${o} 50%)`),
              (i.style.color = h(e.types[0]));
          } else {
            let r = u(e.types[0]);
            (i.style.backgroundColor = r), (i.style.color = h(e.types[0]));
          }
          i.addEventListener("click", function () {
            m(e);
          }),
            n.appendChild(i),
            t.appendChild(n);
        })
        .catch(function (e) {
          console.error("Error loading Pok\xe9mon details:", e);
        });
  }
  function u(e) {
    return (
      {
        normal: "#adb5a1",
        fire: "#EE8130",
        water: "#3c73c4",
        electric: "#f5c52e",
        grass: "#3ea063",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#a33cad",
        ground: "#d1aa4a",
        flying: "#8cbbe9",
        psychic: "#F95587",
        bug: "#89a830",
        rock: "#a4985c",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
      }[e] || "grey"
    );
  }
  function h(e) {
    return (
      {
        normal: "black",
        fire: "black",
        water: "white",
        electric: "black",
        grass: "white",
        ice: "black",
        fighting: "white",
        poison: "white",
        ground: "black",
        flying: "black",
        psychic: "black",
        bug: "black",
        rock: "black",
        ghost: "black",
        dragon: "white",
        dark: "white",
        steel: "black",
        fairy: "black",
      }[e] || "black"
    );
  }
  function m(e) {
    return o(e).then(function () {
      var n, i, l, a, o, r, c, s;
      let d = "",
        p = "",
        u,
        h,
        m,
        g,
        y,
        k,
        b,
        E,
        v,
        L,
        C,
        $,
        w;
      e.height >= 20 && (d = " (This Pok\xe9mon is huge!!)"),
        e.weight >= 1e3 && (p = " (Wow, that's heavy!)"),
        (n = e.name),
        (i = e.imageUrlFront),
        (l = e.imageUrlBack),
        (a = `Type: ${e.types.join(", ")}`),
        (o = `Abilities: ${e.abilities.join(", ")}`),
        (r = `Height: ${e.height} dm${d}`),
        (c = `Weight: ${e.weight} hg${p}`),
        (s = `"${e.flavorText}"`),
        (t.innerHTML = ""),
        t.classList.add("is-visible"),
        (u = document.createElement("div")).classList.add("modal"),
        (h = document.createElement("button")).classList.add("modal-close"),
        (h.innerText = "Close"),
        h.addEventListener("click", f),
        u.appendChild(h),
        ((m = document.createElement("h1")).innerText = n),
        u.appendChild(m),
        (g = document.createElement("div")).classList.add("modal-content"),
        (y = document.createElement("div")).classList.add("pokemon-img"),
        ((k = document.createElement("img")).src = i),
        (k.alt = "Pokemon Image Front"),
        ((b = document.createElement("img")).src = l),
        (b.alt = "Pokemon Image Back"),
        y.appendChild(k),
        y.appendChild(b),
        g.appendChild(y),
        (E = document.createElement("div")).classList.add("pokemon-text"),
        ((v = document.createElement("p")).textContent = a),
        ((L = document.createElement("p")).textContent = o),
        ((C = document.createElement("p")).textContent = r),
        (($ = document.createElement("p")).textContent = c),
        ((w = document.createElement("p")).textContent = s),
        w.classList.add("pokemon-about"),
        E.appendChild(v),
        E.appendChild(L),
        E.appendChild(C),
        E.appendChild($),
        E.appendChild(w),
        g.appendChild(E),
        u.appendChild(g),
        t.appendChild(u),
        console.log(e);
    });
  }
  function f() {
    t.classList.remove("is-visible");
  }
  return (
    d.addEventListener("click", function () {
      (c.value = ""), r("");
      document.querySelector(".footer-text").style.display = "none";
    }),
    document.querySelectorAll(".menu a").forEach((e) => {
      e.addEventListener("click", function (e) {
        e.preventDefault();
        let t = this.getAttribute("data-type");
        document
          .querySelectorAll(".menu a")
          .forEach((e) => e.classList.remove("active")),
          this.classList.add("active"),
          (function e(t) {
            l();
            let n = pokemonRepository.getAll(),
              i = [];
            i = "all" === t ? n : n.filter((e) => e.types.includes(t));
            let o = document.querySelector(".pokemon-list"),
              r = document.querySelector("#no-results-message");
            (o.innerHTML = ""),
              i.length > 0
                ? (r.classList.add("hidden"),
                  i.forEach((e) => {
                    p(e);
                  }))
                : r.classList.remove("hidden"),
              a();
          })(t);
      });
    }),
    window.addEventListener("keydown", (e) => {
      "Escape" === e.key && t.classList.contains("is-visible") && f();
    }),
    t.addEventListener("click", (e) => {
      e.target === t && f();
    }),
    window.addEventListener("scroll", function () {
      let e = document.getElementById("back-to-top");
      window.scrollY > 200
        ? (e.style.display = "block")
        : (e.style.display = "none");
    }),
    document
      .getElementById("back-to-top")
      .addEventListener("click", function (e) {
        e.preventDefault(), window.scrollTo({ top: 0, behavior: "smooth" });
      }),
    {
      add: n,
      getAll: i,
      addListItem: p,
      loadList: function e() {
        return (
          l(),
          fetch("https://pokeapi.co/api/v2/pokemon/?limit=300")
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              a(),
                e.results.forEach(function (e) {
                  n({ name: e.name, detailsUrl: e.url });
                });
            })
            .catch(function (e) {
              a(), console.error(e);
            })
        );
      },
      loadDetails: o,
      showDetails: m,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
