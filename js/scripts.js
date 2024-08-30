let pokemonRepository = (function () {
  let e = [],
    t = document.querySelector("#modal-container");
  function n(t) {
    e.push(t);
  }
  function o() {
    let e = document.querySelector(".loading-text");
    e && (e.style.display = "block");
  }
  function l() {
    let e = document.querySelector(".loading-text");
    e && (e.style.display = "none");
  }
  function i(e) {
    o();
    let t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return l(), e.json();
      })
      .then(function (t) {
        return (
          (e.imageUrlFront = t.sprites.front_default),
          (e.imageUrlBack = t.sprites.back_default),
          (e.types = t.types.map((e) => e.type.name)),
          (e.abilities = t.abilities.map((e) => e.ability.name)),
          (e.height = t.height),
          (e.weight = t.weight),
          (function (e) {
            let t = e.detailsUrl.replace("/pokemon/", "/pokemon-species/");
            return fetch(t)
              .then(function (e) {
                return e.json();
              })
              .then(function (t) {
                let n = t.flavor_text_entries.find(
                  (e) => "en" === e.language.name
                );
                e.flavorText = n ? n.flavor_text : "No flavor text available.";
              })
              .catch(function (e) {
                console.error(e);
              });
          })(e)
        );
      })
      .catch(function (e) {
        l(), console.error(e);
      });
  }
  function c(e) {
    o();
    const t = pokemonRepository
        .getAll()
        .filter((t) => t.name.toLowerCase().includes(e.toLowerCase())),
      n = document.querySelector(".pokemon-list"),
      i = document.querySelector("#no-results-message");
    (n.innerHTML = ""),
      t.length > 0
        ? (i.classList.add("hidden"),
          t.forEach((e) => {
            r(e);
          }))
        : i.classList.remove("hidden"),
      l();
  }
  const a = document.querySelector("#search");
  a.addEventListener("input", function () {
    c(a.value);
  });
  function r(e) {
    let t = document.querySelector(".pokemon-list"),
      n = document.createElement("li"),
      o = document.createElement("button");
    (o.innerText = e.name),
      o.classList.add("button-class"),
      i(e)
        .then(function () {
          let l = document.createElement("img");
          if (
            ((l.src = e.imageUrlFront),
            (l.alt = e.name),
            l.classList.add("button-img"),
            o.appendChild(l),
            e.types.length > 1)
          ) {
            let t = s(e.types[0]),
              n = s(e.types[1]);
            (o.style.background = `linear-gradient(to right, ${t} 50%, ${n} 50%)`),
              (o.style.color = d(e.types[0]));
          } else {
            let t = s(e.types[0]);
            (o.style.backgroundColor = t), (o.style.color = d(e.types[0]));
          }
          o.addEventListener("click", function () {
            u(e);
          }),
            n.appendChild(o),
            t.appendChild(n);
        })
        .catch(function (e) {
          console.error("Error loading Pokémon details:", e);
        });
  }
  function s(e) {
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
  function d(e) {
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
  function u(e) {
    return i(e).then(function () {
      let n = "",
        o = "";
      e.height >= 20 && (n = " (This Pokémon is huge!!)"),
        e.weight >= 1e3 && (o = " (Wow, that's heavy!)"),
        (function (e, n, o, l, i, c, a, r) {
          (t.innerHTML = ""), t.classList.add("is-visible");
          let s = document.createElement("div");
          s.classList.add("modal");
          let d = document.createElement("button");
          d.classList.add("modal-close"),
            (d.innerText = "Close"),
            d.addEventListener("click", m),
            s.appendChild(d);
          let u = document.createElement("h1");
          (u.innerText = e), s.appendChild(u);
          let p = document.createElement("div");
          p.classList.add("modal-content");
          let h = document.createElement("div");
          h.classList.add("pokemon-img");
          let f = document.createElement("img");
          (f.src = n), (f.alt = "Pokemon Image Front");
          let g = document.createElement("img");
          (g.src = o),
            (g.alt = "Pokemon Image Back"),
            h.appendChild(f),
            h.appendChild(g),
            p.appendChild(h);
          let y = document.createElement("div");
          y.classList.add("pokemon-text");
          let k = document.createElement("p");
          k.textContent = l;
          let b = document.createElement("p");
          b.textContent = i;
          let E = document.createElement("p");
          E.textContent = c;
          let v = document.createElement("p");
          v.textContent = a;
          let L = document.createElement("p");
          (L.textContent = r),
            L.classList.add("pokemon-about"),
            y.appendChild(k),
            y.appendChild(b),
            y.appendChild(E),
            y.appendChild(v),
            y.appendChild(L),
            p.appendChild(y),
            s.appendChild(p),
            t.appendChild(s);
        })(
          e.name,
          e.imageUrlFront,
          e.imageUrlBack,
          `Type: ${e.types.join(", ")}`,
          `Abilities: ${e.abilities.join(", ")}`,
          `Height: ${e.height} dm${n}`,
          `Weight: ${e.weight} hg${o}`,
          `"${e.flavorText}"`
        ),
        console.log(e);
    });
  }
  function m() {
    t.classList.remove("is-visible");
  }
  return (
    document
      .querySelector("#clear-search")
      .addEventListener("click", function () {
        (a.value = ""),
          c(""),
          (document.querySelector(".footer-text").style.display = "none");
      }),
    document.querySelectorAll(".menu a").forEach((e) => {
      e.addEventListener("click", function (e) {
        e.preventDefault();
        const t = this.getAttribute("data-type");
        document
          .querySelectorAll(".menu a")
          .forEach((e) => e.classList.remove("active")),
          this.classList.add("active"),
          (function (e) {
            o();
            const t = pokemonRepository.getAll();
            let n = [];
            n = "all" === e ? t : t.filter((t) => t.types.includes(e));
            const i = document.querySelector(".pokemon-list"),
              c = document.querySelector("#no-results-message");
            (i.innerHTML = ""),
              n.length > 0
                ? (c.classList.add("hidden"),
                  n.forEach((e) => {
                    r(e);
                  }))
                : c.classList.remove("hidden"),
              l();
          })(t);
      });
    }),
    window.addEventListener("keydown", (e) => {
      "Escape" === e.key && t.classList.contains("is-visible") && m();
    }),
    t.addEventListener("click", (e) => {
      e.target === t && m();
    }),
    window.addEventListener("scroll", function () {
      const e = document.getElementById("back-to-top");
      window.scrollY > 200
        ? (e.style.display = "block")
        : (e.style.display = "none");
    }),
    document
      .getElementById("back-to-top")
      .addEventListener("click", function (e) {
        e.preventDefault(), window.scrollTo({ top: 0, behavior: "smooth" });
      }),
    window.addEventListener("scroll", function () {
      const e = document.querySelector("footer");
      window.innerHeight + window.scrollY >= document.body.offsetHeight
        ? (e.style.display = "block")
        : (e.style.display = "none");
    }),
    {
      add: n,
      getAll: function () {
        return e;
      },
      addListItem: r,
      loadList: function () {
        return (
          o(),
          fetch("https://pokeapi.co/api/v2/pokemon/?limit=300")
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              l(),
                e.results.forEach(function (e) {
                  n({ name: e.name, detailsUrl: e.url });
                });
            })
            .catch(function (e) {
              l(), console.error(e);
            })
        );
      },
      loadDetails: i,
      showDetails: u,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
