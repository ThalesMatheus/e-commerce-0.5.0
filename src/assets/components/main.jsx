import { faStar } from "@fortawesome/free-solid-svg-icons";
import { list } from "postcss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Apm from './api'
//import fetch from "node-fetch";

const mul = [];
let x = 0;
function slide(x) {
  var y = 0;
  for (y = 0; y < x; y++) {
    var z = y + 1;
    mul.push({ id: z });
  }
}
const mil = [];

function cd(x) {
  var y = 0;
  for (y = 0; y < x; y++) {
    var z = y + 1;
    mil.push({ id: z });
  }
}
slide(3);
cd(10)
console.log(mul);

const FirstLs = (props) => {
  const [Card, SetCard] = useState(0);
  useEffect(() => {
    if (Card > 3 || Card === 5) {
      SetCard((Card) => (Card = 0));
    }
  }, [Card]);

  useEffect(() => {
    if (Card < 0) {
      SetCard((Card) => Card + 3);
    }
  }, [Card]);
  const Reset = useState(0);

  return (
    <div className="presale relative">
      <div className="Stars">
        <h1 className="flex pre-tittle">
          PRE-VENDAS
          <span class="material-symbols-outlined animate-pulse m-0">
            auto_awesome
          </span>
        </h1>
      </div>
      <a
        className="absolute left-nav"
        onClick={() => SetCard((Card) => Card  -1)}
        href={`#${Card}`}
      >
        aa
      </a>
      <div className="flex cu relative overflow-hidden">
        {mul.map((ls) => (
          <ul className="items flex" id={`${ls.id}`}>
            {mil.map((ml) =>
            <li className={`item item${ml.id}`}>
              <Apm/>
            </li>
            )}
          </ul>
        ))}
      </div>
      <a
        className="absolute right-nav"
        type="button"
        onClick={() => SetCard((Card) => Card + 1)}
        href={`#${Card}`}
      >

      </a>
    </div>
  );
};

const Expanded = (props) => {
  return (
    <>
    <div className="info">
      <h1 className="flex pre-tittle">
        Best Sellers
      </h1>
      <div className="Carroussel-info">
        <div className="omni-slide slide1">

        </div>
        <div className="omni-slide slide2">

        </div>
      </div>
      <div>
      </div>
    </div>

    <h1 className="flex pre-tittle">
      Recomendação
    </h1>

    <div className="presale-spacing">
      <div className="presale-figures">
        <div className="sale1">
        </div>
        <div className="sale2">
        </div>
        <div className="sale2-1">
        </div>
        <div className="sale3">
        </div>
      </div>
    </div>
    </>
    )
};
function Main() {
  return (
    <>
      <section class="main-grid">
        <FirstLs />
        <Expanded />
      </section>
    </>
  );
}
export default Main;
