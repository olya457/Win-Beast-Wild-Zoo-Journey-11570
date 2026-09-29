export const loaderHtml = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<style>
html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: transparent; }
body { font: 12px -apple-system, BlinkMacSystemFont, sans-serif; color: #8f839d; }
.loader { position: absolute; left: 0; right: 0; bottom: 8px; }
.labels { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; line-height: 18px; }
.track { height: 4px; overflow: hidden; border-radius: 4px; background: #ffffff20; }
.fill { width: 100%; height: 100%; border-radius: 4px; background: linear-gradient(90deg, #40f49a, #8c6bea 65%, #b250ff); transform: scaleX(0); transform-origin: left; }
</style>
</head>
<body>
<div class="loader" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
<div class="labels"><span>Loading your experience</span><span id="percentage">0%</span></div>
<div class="track"><div class="fill" id="fill"></div></div>
</div>
<script>
var start;
var sent = false;
function frame(time) {
  if (start === undefined) start = time;
  var progress = Math.min(1, (time - start) / 4000);
  var percentage = Math.floor(progress * 100);
  document.getElementById('percentage').textContent = percentage + '%';
  document.getElementById('fill').style.transform = 'scaleX(' + progress + ')';
  document.querySelector('.loader').setAttribute('aria-valuenow', percentage);
  if (progress < 1) {
    requestAnimationFrame(frame);
  } else if (!sent) {
    sent = true;
    requestAnimationFrame(function () { window.ReactNativeWebView.postMessage('finished'); });
  }
}
requestAnimationFrame(frame);
</script>
</body>
</html>`;
