var i = 0

onmessage = function(event) {
    console.log('recv mesg: ', event.data)
}

function timedCount () {
  i = i + 1
  postMessage(i)
  setTimeout('timedCount()', 500)
}

timedCount()
