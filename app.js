
let expression = "0"
let answer = 0
let allowZeros = 0
let allowPoint = 1


const App = () => {

  const [value, setValue] = React.useState(false);

  const disp = (symbol) => {
    let newVal
    let prev = expression
    if(/[+-/]/.test(symbol) && /[+-/]/.test(prev[prev.length-1])) {
      if(/[-]/.test(symbol)) newVal = prev + symbol
      else {
        let cnt = 0
        for(let i=prev.length-1; i>=0; i--){
          if(/[+*-/]/.test(prev[i])) cnt++
          else break
        }
        newVal = prev.slice(0,prev.length-cnt) + symbol
      }
    }else if(symbol === "0") {
      if(allowZeros === 0) newVal = prev
      else if(allowZeros === 1) {
        newVal = prev + symbol
        allowZeros = 0
      }else newVal = prev + symbol
    }else if(symbol === "."){
      if(allowPoint === 1){
        newVal = prev + symbol
        allowPoint = 0
        allowZeros = 2
      }else newVal = prev 
    }else {
      if(allowZeros === 0 && /[1-9]/.test(symbol)) {
        newVal = prev.slice(0,-1) + symbol
        allowZeros = 2
      }else {
        if(/[+*-/]/.test(symbol)) {
          allowZeros = 1
          allowPoint = 1
        }else allowZeros = 2
        newVal = (prev + symbol)
      }
    }
    expression = newVal
    setValue((value) => !value);
  }

  const allClear = () => {
    allowZeros = 0
    allowPoint = 1
    expression = "0"
    answer = 0
    setValue((value) => !value);
  }

  const calculate = () => {
    let res = eval(expression)
    answer = res
    expression = (res).toString()
    if(res === 0) allowZeros = 0
    else allowZeros = 2
    if(Number.isInteger(res)) allowPoint = 1
    else allowPoint = 0
    setValue((value) => !value);
  }

  return (
    <div className="container-fluid justify-content-center min-vh-100">
      <div className="grid justify-content-center pt-5">
        <div id="display-box">
          <input id="display" type="text" className="exp text-secondary border-0 col-12 text-end h4" style={{backgroundColor: "white"}} value={expression} placeholder="0" disabled/>
          <input type="text" className="ans text-dark border-0 col-12 text-end h2" style={{backgroundColor: "white"}} value={answer} disabled />
        </div>
        <div onClick={allClear} className="padButton bg-danger" id="clear">AC</div>
        <div onClick={() => disp("/")} className="padButton" id="divide">/</div>
        <div onClick={() => disp("*")} className="padButton" id="multiply">x</div>
        <div onClick={() => disp("7")} className="padButton bg-info" id="seven">7</div>
        <div onClick={() => disp("8")} className="padButton bg-info" id="eight">8</div>
        <div onClick={() => disp("9")} className="padButton bg-info" id="nine">9</div>
        <div onClick={() => disp("-")} className="padButton " id="subtract">-</div>
        <div onClick={() => disp("4")} className="padButton bg-info" id="four">4</div>
        <div onClick={() => disp("5")} className="padButton bg-info" id="five">5</div>
        <div onClick={() => disp("6")} className="padButton bg-info" id="six">6</div>
        <div onClick={() => disp("+")} className="padButton" id="add">+</div>
        <div onClick={() => disp("1")} className="padButton bg-info" id="one">1</div>
        <div onClick={() => disp("2")} className="padButton bg-info" id="two">2</div>
        <div onClick={() => disp("3")} className="padButton bg-info" id="three">3</div>
        <div onClick={calculate} className="padButton bg-info" id="equals">=</div>
        <div onClick={() => disp("0")} className="padButton bg-info" id="zero">0</div>
        <div onClick={() => disp(".")} className="padButton bg-info" id="decimal">.</div>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)