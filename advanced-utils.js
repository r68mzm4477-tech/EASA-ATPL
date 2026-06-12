
window.saveProgress = function(subject, score){
  try{
    localStorage.setItem("progress_"+subject, score);
  }catch(e){}
}

window.loadProgress = function(subject){
  try{
    return localStorage.getItem("progress_"+subject) || "0";
  }catch(e){}
  return "0";
}

window.makeCalculator = function(containerId, formula){
  const root = document.getElementById(containerId);
  if(!root) return;

  root.innerHTML = `
    <div style="background:#fff;border:1px solid #D0D8DE;padding:16px;border-radius:6px;">
      <div style="font:700 18px sans-serif;margin-bottom:12px;">${formula.title}</div>

      ${formula.fields.map(f => `
        <div style="margin-bottom:10px;">
          <label>${f}</label><br>
          <input id="${f}" type="number" style="padding:8px;width:100%;margin-top:4px;">
        </div>
      `).join("")}

      <button id="calcBtn" style="padding:10px 14px;background:#16222C;color:#fff;border:none;border-radius:4px;cursor:pointer;">
        Calculate
      </button>

      <div id="calcResult" style="margin-top:14px;font:700 18px sans-serif;"></div>
    </div>
  `;

  document.getElementById("calcBtn").onclick = function(){
    const values = {};
    formula.fields.forEach(f=>{
      values[f] = parseFloat(document.getElementById(f).value || 0);
    });

    const result = formula.compute(values);

    document.getElementById("calcResult").innerHTML =
      formula.resultLabel + ": " + result.toFixed(2);
  }
}
