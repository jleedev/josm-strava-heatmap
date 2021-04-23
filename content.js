

console.log("JOSM IMAGERY URL RUNNING")

document.body.insertAdjacentHTML('afterbegin', `
    <div id="josm-modal" class="josm-modal">
        <div id="josm-modal-dialog" class="josm-modal-dialog">
            <h5>JOSM imagery URL has been copied to the clipboard</h5>
            <code>
                <pre id="josm-imagery-url"></pre>
            </code>
        </div>
    </div>
`);

let ctrl_top_right = document.querySelector('.mapboxgl-ctrl-top-right');
let button = document.createElement('button');
button.className = 'josm-imagery';
button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
    <defs>
        <linearGradient id="a">
        <stop offset="0"/>
        <stop offset=".5" stop-color="#f50"/>
        <stop offset="1" stop-opacity=".9"/>
        </linearGradient>
        <linearGradient xlink:href="#a" id="b" x1="43.8" y1="43.4" x2="4.7" y2="5.5" gradientUnits="userSpaceOnUse"/>
    </defs>
    <path d="M46 32.8H32.8V46H46zm-30.8 0H2V46h13.2zm15.4 0H17.4V46h13.2zm0-15.4H17.4v13.2h13.2zm-15.4 0H2v13.2h13.2zm30.8 0H32.8v13.2H46zM15.2 2H2v13.2h13.2zM46 2H32.8v13.2H46zM30.6 2H17.4v13.2h13.2z" fill="url(#b)"/>
    </svg>
`
ctrl_top_right.prepend(button);


button.addEventListener("click", copyHeatmapUrl);

async function copyHeatmapUrl(e) 
{
    let heatmap_url = await browser.runtime.sendMessage({"name": "getHeatmapUrl"});
    console.log(heatmap_url);
    navigator.clipboard.writeText(heatmap_url)
    document.querySelector('#josm-imagery-url').textContent = heatmap_url
    document.querySelector('#josm-modal').classList.add('active');
}


document.querySelector('#josm-modal').addEventListener("click", e => {
    e.target.classList.remove('active')
})

console.log('JOSM IMAGERY URL FINISHED');
