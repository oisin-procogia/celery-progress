
// function CeleryProgressBarClass() {
//     function onSuccessDefault(progressBarElement, progressBarMessageElement, result) {
//         progressBarElement.style.backgroundColor = '#76ce60';
//         progressBarMessageElement.innerHTML = "Success!";
//     }

//     function onResultDefault(resultElement, result) {
//         if (resultElement) {
//             resultElement.innerHTML = result;
//         }
//     }

//     function onErrorDefault(progressBarElement, progressBarMessageElement, excMessage) {
//         progressBarElement.style.backgroundColor = '#dc4f63';
//         progressBarMessageElement.innerHTML = "Uh-Oh, something went wrong! " + excMessage;
//     }

//     function onProgressDefault(progressBarElement, progressBarMessageElement, progress) {
//         progressBarElement.style.backgroundColor = '#68a9ef';
//         progressBarElement.style.width = progress.percent + "%";
//         var description = progress.description || "";
//         progressBarMessageElement.innerHTML = progress.current + ' of ' + progress.total + ' processed. ' + description;
//     }

//     function updateProgress (progressUrl, options) {
//         options = options || {};
//         var progressBarId = options.progressBarId || 'progress-bar';
//         var progressBarMessage = options.progressBarMessageId || 'progress-bar-message';
//         var progressBarElement = options.progressBarElement || document.getElementById(progressBarId);
//         var progressBarMessageElement = options.progressBarMessageElement || document.getElementById(progressBarMessage);
//         var onProgress = options.onProgress || onProgressDefault;
//         var onSuccess = options.onSuccess || onSuccessDefault;
//         var onError = options.onError || onErrorDefault;
//         var pollInterval = options.pollInterval || 500;
//         var resultElementId = options.resultElementId || 'celery-result';
//         var resultElement = options.resultElement || document.getElementById(resultElementId);
//         var onResult = options.onResult || onResultDefault;


//         fetch(progressUrl).then(function(response) {
//             response.json().then(function(data) {
//                 if (data.progress) {
//                     onProgress(progressBarElement, progressBarMessageElement, data.progress);
//                 }
//                 if (!data.complete) {
//                     setTimeout(updateProgress, pollInterval, progressUrl, options);
//                 } else {
//                     if (data.success) {
//                         onSuccess(progressBarElement, progressBarMessageElement, data.result);
//                     } else {
//                         onError(progressBarElement, progressBarMessageElement, data.progress);
//                     }
//                     if (data.result) {
//                         onResult(resultElement, data.result);
//                     }
//                 }
//             });
//         });
//     }
//     return {
//         onSuccessDefault: onSuccessDefault,
//         onResultDefault: onResultDefault,
//         onErrorDefault: onErrorDefault,
//         onProgressDefault: onProgressDefault,
//         updateProgress: updateProgress,
//         initProgressBar: updateProgress,  // just for api cleanliness
//     };
// })();








var CeleryProgressBar = (function () {
    function onSuccessDefault(progressBarElement, progressBarMessageElement, result) {
        progressBarElement.style.backgroundColor = '#76ce60';
        progressBarMessageElement.innerHTML = "Success!";
    }

    function onResultDefault(resultElement, result) {
        if (resultElement) {
            resultElement.innerHTML = result;
        }
    }

    function onErrorDefault(progressBarElement, progressBarMessageElement, excMessage) {
        progressBarElement.style.backgroundColor = '#dc4f63';
        progressBarMessageElement.innerHTML = "Uh-Oh, something went wrong! " + excMessage;
    }

    function onProgressDefault(progressBarElement, progressBarMessageElement, progress) {
        progressBarElement.style.backgroundColor = '#68a9ef';
        progressBarElement.style.width = progress.percent + "%";
        var description = progress.description || "";
        progressBarMessageElement.innerHTML = progress.current + ' of ' + progress.total + ' processed. ' + description;
    }

    function updateProgress (progressUrl, options) {
        options = options || {};
        var progressBarId = options.progressBarId || 'progress-bar';
        var progressBarMessage = options.progressBarMessageId || 'progress-bar-message';
        var progressBarElement = options.progressBarElement || document.getElementById(progressBarId);
        var progressBarMessageElement = options.progressBarMessageElement || document.getElementById(progressBarMessage);
        var onProgress = options.onProgress || onProgressDefault;
        var onSuccess = options.onSuccess || onSuccessDefault;
        var onError = options.onError || onErrorDefault;
        var pollInterval = options.pollInterval || 500;
        var resultElementId = options.resultElementId || 'celery-result';
        var resultElement = options.resultElement || document.getElementById(resultElementId);
        var onResult = options.onResult || onResultDefault;


        fetch(progressUrl).then(function(response) {
            this.response = response
            this.response.json().then(function(data) {
                this.data = data
                // if (!this.data) {
                //     setTimeout(updateProgress, 500, progressUrl, options);
                // } 
                console.log('wooo data: ',this.data)
                if (this.data.progress) {
                    onProgress(progressBarElement, progressBarMessageElement, this.data.progress);
                }
                if (!this.data.complete) {
                    setTimeout(updateProgress, pollInterval, progressUrl, options);
                } else {
                    if (this.data.success) {
                        onSuccess(progressBarElement, progressBarMessageElement, this.data.result);
                    } else {
                        onError(progressBarElement, progressBarMessageElement, this.data.progress);
                    }
                    if (this.data.result) {
                        onResult(resultElement, this.data.result);
                    }
                }
            });
        });
    }
    return {
        onSuccessDefault: onSuccessDefault,
        onResultDefault: onResultDefault,
        onErrorDefault: onErrorDefault,
        onProgressDefault: onProgressDefault,
        updateProgress: updateProgress,
        initProgressBar: updateProgress,  // just for api cleanliness
    };
})();


function createProgressBar() {

    this.progressUrl = "wooo22222"
    this.oisin = "oisin yeah111"

    this.onSuccess = function(progressBarElement, progressBarMessageElement, result) {
        progressBarElement.style.backgroundColor = '#76ce60';
        progressBarMessageElement.innerHTML = "Success!";
    }

    this.onResult = function(resultElement, result) {
        if (resultElement) {
            resultElement.innerHTML = result;
        }
    }

    this.onError = function(progressBarElement, progressBarMessageElement, excMessage) {
        progressBarElement.style.backgroundColor = '#dc4f63';
        progressBarMessageElement.innerHTML = "Uh-Oh, something went wrong! " + excMessage;
    }

    this.onProgress = function(progressBarElement, progressBarMessageElement, progress) {

        this.progress = progress
        progressBarElement.style.backgroundColor = '#68a9ef';
        progressBarElement.style.width = this.progress.percent + "%";
        // console.log('current progress:   ', this.progress)
        this.description = this.progress.description || "";
        console.log('onprogress function: ', this.progress, progressBarElement)

        progressBarMessageElement.innerHTML = progress.current + ' of ' + this.progress.total + ' processed. ' + this.description;
    }

    this.initProgressBar = function(progressUrl, options) {
        console.log('inside init function', this.progressUrl)
        this.progressUrl = progressUrl;
        this.options = options || {};
        this.progressBarId = this.options.progressBarId || 'progress-bar';
        this.progressBarMessage = this.options.progressBarMessageId || 'progress-bar-message';
        this.progressBarElement = this.options.progressBarElement || document.getElementById(this.progressBarId);
        this.progressBarMessageElement = this.options.progressBarMessageElement || document.getElementById(this.progressBarMessage);
        this.onProgress = this.options.onProgress || this.onProgress;
        this.onSuccess = this.options.onSuccess || this.onSuccess;
        this.onError = this.options.onError || this.onError;
        this.pollInterval = this.options.pollInterval || 500;
        this.resultElementId = this.options.resultElementId || 'celery-result';
        this.resultElement = this.options.resultElement || document.getElementById(this.resultElementId);
        this.onResult = this.options.onResult || this.onResult;

        this.updateProgress('redundant', 'redundant')
    }

    this.updateProgress = (progressUrl2, options)=> {
        // this.progressUrl = progressUrl;
        // this.options = options || {};
        // console.log('inside progress function', this.progressUrl)

        fetch(this.progressUrl).then((response)=> {
            this.response = response
            this.response.json().then((data)=> {
                this.data = data
                console.log('inside yo  ', this.data)
                if (!this.data) {
                    // console.log('!this.data')
                    setTimeout(this.updateProgress, this.pollInterval, this.progressUrl, this.options);
                } 
                if (this.data.progress) {
                    this.onProgress(this.progressBarElement, this.progressBarMessageElement, this.data.progress);
                }
                if (!this.data.complete) {
                    // console.log('data not complete')
                    setTimeout(this.updateProgress, this.pollInterval, this.progressUrl, this.options);
                } else {
                    if (this.data.success) {
                        this.onSuccess(this.progressBarElement, this.progressBarMessageElement, this.data.result);
                    } else {
                        this.onError(this.progressBarElement, this.progressBarMessageElement, this.data.progress);
                    }
                    if (this.data.result) {
                        this.onResult(this.resultElement, this.data.result);
                    }
                }
            });
        });
    }
    // return {
    //     onSuccessDefault: onSuccessDefault,
    //     onResultDefault: onResultDefault,
    //     onErrorDefault: onErrorDefault,
    //     onProgressDefault: onProgressDefault,
    //     updateProgress: updateProgress,
    //     initProgressBar: updateProgress,  // just for api cleanliness
    // };
};

let CeleryProgressBar3 = new createProgressBar()
let CeleryProgressBar2 = new createProgressBar()