const p1f = document.getElementById("p1f");
const p2f = document.getElementById("p2f");

const p1s = document.getElementById("p1s");
const p2s = document.getElementById("p2s");

const p1n = document.getElementById("p1n");
const p2n = document.getElementById("p2n");

const p1h = document.getElementById("p1h");
const p2h = document.getElementById("p2h");

const p1ch = document.getElementById("p1ch");
const p1cv = document.getElementById("p1cv");

const p2ch = document.getElementById("p2ch");
const p2cv = document.getElementById("p2cv");

const tr = document.createElement("tr");
const td = document.createElement("td");

const previewHTML = `<table>
  <tbody class="field">
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
  <tbody class="connect cnt-hori">
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
  <tbody class="connect cnt-vert">
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>`;

for (let i = 0; i < 9; i++) {
  if(i == 8) for (let i = 0; i < 21; i++) {
    p1ch.appendChild(tr.cloneNode(true));
    p2ch.appendChild(tr.cloneNode(true));
  }
  const tdobj = td.cloneNode(true);
  tdobj.style = `--col: ${i};`;
  tr.appendChild(tdobj);
}
for (let i = 0; i < 21; i++) {
  const trobj = tr.cloneNode(true);
  if (i == 0) trobj.classList.add("buffer", "disp");
  else {
    p1cv.appendChild(trobj.cloneNode(true));
    p2cv.appendChild(trobj.cloneNode(true));
  }
  trobj.style = `--row: ${20 - i};`;
  p1f.appendChild(trobj.cloneNode(true));
  p2f.appendChild(trobj);
}
p1n.innerHTML = p2n.innerHTML = previewHTML.repeat(7);
p1h.innerHTML = p2h.innerHTML = previewHTML;
