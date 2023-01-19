// элементы в DOM по querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input'); // инпут минимальный вес
const maxWeight = document.querySelector('.maxweight__input'); // инпут макс вес
const filtrDrop = document.querySelector('.filterdpop__btn'); // кнопка сброса фильтра

 // список фруктов в JSON формате (начальный)
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13, "border": "violet"},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35, "border": "green"},
  {"kind": "Личи", "color": "розово-красный", "weight": 17, "border": "carmazin"},
  {"kind": "Карамбола", "color": "желтый", "weight": 28, "border": "yellow"},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22, "border": "lightbrown"}
]`;


// парсинг JSON в JS
let fruits = JSON.parse(fruitsJSON);



/*** ОТОБРАЖЕНИЕ карточек ***/

// отрисовка карточек
const display = () => {
  document.getElementById("fl").innerHTML = "";
  
  for (let i = 0; i < fruits.length; i++) {
    const li =  document.createElement("li");
    
   li.innerHTML += `<li>
   <div class="fruit__info">
     <div>index: ${i+1}</div>
     <div>kind: ${fruits[i].kind}</div>
     <div>color: ${fruits[i].color}</div>
     <div>weight (кг): ${fruits[i].weight}</div>
   </div>
 </li>`
 li.setAttribute("class", `fruit__item fruit_${fruits[i].border}`);
 fl.appendChild(li);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/
// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// перемешивание массива
let control = [];
const shuffleFruits = () => {
  let result = [];
  let n = fruits.length;
  for (let i =0; i < n; i++) {
    let random = getRandomInt(0, fruits.length-1);
    result[i] = fruits[random];
    fruits.splice(random, 1);
  }
// проверка на результат перемешивания === первоначальному
if (JSON.stringify(control) != JSON.stringify(result)) {
fruits = result;
} else {
  alert("Неудачно! перемешайте еще раз...");
fruits = control; 
}
}

shuffleButton.addEventListener('click', () => {
  control = Array.from(fruits);
  shuffleFruits();
  display();
  }
 );

 /*** ФИЛЬТРАЦИЯ ***/
let fix =[];
const filterFruits = () => {
var res2 = fruits.filter(e => e.weight >= minWeight.value && e.weight <= maxWeight.value);
fruits = res2;
};

filterButton.addEventListener('click', () => {
  fix = Array.from(fruits);
  filterFruits();
  console.log(filterFruits())
  display();
});
filtrDrop.addEventListener('click', () => {
  fruits = fix;
  display();
});

/*** СОРТИРОВКА ***/
let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
//  функция сравнения двух элементов по цвету
  const comparationColor = (a, b) => {
  const priority = ['розово-красный', 'оранжевый', 'желтый', 'светло-коричневый', 'зеленый', 'фиолетовый'];
  const priorityA = priority.indexOf(a.color);
  const priorityB = priority.indexOf(b.color);
  return priorityA < priorityB;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком

   const n = arr.length;
   // внешняя итерация по элементам
   for (let i = 0; i < n-1; i++) { 
       // внутренняя итерация для перестановки элемента в конец массива
       for (let j = 0; j < n-1-i; j++) { 
           // сравниваем элементы
           if (comparation(arr[j], arr[j+1])) { 
               // делаем обмен элементов
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
       }
   }                   
  },

  quickSort (arr) {
    quickSort(arr);
    
    function swap(arr, firstIndex, secondIndex){
      const temp = arr[firstIndex];
      arr[firstIndex] = arr[secondIndex];
      arr[secondIndex] = temp;
    }
    
    function partition(arr, left, right,) {
      
      var pivot = arr[Math.floor((right + left) / 2)],
          i = left,
          j = right;
      while (i <= j) {
          while (comparationColor(pivot, arr[i])) {
              i++;
          }
          while (comparationColor(arr[j], pivot)) {
              j--;
          }
          if (i <= j) {
              swap(arr, i, j);
              i++;
              j--;
          }
      }
      return i;
    }
    function quickSort(arr, left, right) {
      var index;
      if (arr.length > 1) {
          left = typeof left != "number" ? 0 : left;
          right = typeof right != "number" ? arr.length - 1 : right;
          index = partition(arr, left, right);
          if (left < index - 1) {
              quickSort(arr, left, index - 1);
          }
          if (index < right) {
              quickSort(arr, index, right);
          }
      }
      return arr;
    }
    }
  ,

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {

    const start = new Date().getTime();
    // добавил переход на функцию quikSort внешнюю
    //if (sort == 'bubbleSort') {
    sort(arr, comparation);
    //} else {
      //quickSort(fruits);
     // quickSortCall (fruits);
    //}
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
}
// инициализация полей времени и метода сортировки
sortTimeLabel.textContent = sortTime;
sortKindLabel.textContent = sortKind;

// смена метода сортировки
sortChangeButton.addEventListener('click', () => {
  (sortKind == 'bubbleSort') ? sortKind = 'quickSort' : sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

// запуск сортировки, вывод метода и времени сортировки
sortActionButton.addEventListener('click', () => {
  
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/
addActionButton.addEventListener('click', () => {
  // проверка значений на валидность
  if (! kindInput.value || ! colorInput.value  || ! weightInput.value) {
    alert("Заполните все поля!");
  }
  else if (isNaN(weightInput.value)) {
    alert("Вес укажите в кг, в формате 0.0!");
  }
  // добавляем новый объект в массив fruits
  else {
    fruits.push({kind: kindInput.value, color: colorInput.value, weight: weightInput.value, border: 'new_one'})
  display();
  }  
});





