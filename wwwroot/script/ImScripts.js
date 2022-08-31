﻿$(document).ready(function () {
    $('.dropdown-toggle').dropdown();   

    $(".notification-icon").click(function () {
        console.log("clicked");
    });
});

window.auto_grow = (event) => {
    // for textareas
    let element = event.target;
    element.style.height = '5px';
    element.style.height = element.scrollHeight + 'px';
}

window.clickTest = (e) => {
    console.log(e);
    event.stopPropagation();
    return "yes";
   // DotNet.invokeMethodAsync('ImBlazorWebAssembly', 'callMeFromJS');
}

window.fileuploadChanged = (source, infoId) => {   
    let count = $(source).prop('files').length;
    let info = count > 1 ? count + " files selected" : count + " file selected";
    $("#" + infoId).html(info);
}

window.getMoment = (date) => {
    console.log("hi from script file");
    return moment(date).fromNow();   
};

window.drawOverallChart = (data) => {
      Highcharts.chart('overallChart', {
        chart: {
            type: 'pie',           
        },
        title: {
            text: ''
        },
        credits:
        {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Share',
            data: [                
                {
                    name: 'New', y: data.new, color: {
                        linearGradient: [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(245,124,0,1)'],
                            [1, 'rgba(255,226,0,1)']
                        ]
                    }
                },          
                {
                    name: 'In Progress', y: data.inProgress, color: {
                        linearGradient: [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(25,118,210,1)'],
                            [1, 'rgba(0,237,255,1)']
                        ]
                    }
                },
                {
                    name: 'Closed', y: data.closed, color: {
                        linearGradient: [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(67,160,71,1)'],
                            [1, 'rgba(0,255,187,1)']
                        ]
                    }
                },
          
                {
                    name: 'Approved', y: data.approved, color: {
                        linearGradient: [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(27,94,32,1)'],
                            [1, 'rgba(19,255,0,1)']
                        ]
                    }
                },
                {
                    name: 'Late', y: data.late, color: {
                        linearGradient: [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(183,28,28,1)'],
                            [1, 'rgba(255,140,0,1)']
                        ]
                    }
                }
                
            ]
        }]
    });

    return "okay";
}

window.drawMostAssignedToUserChart = (data) => {
  //  console.log(data);
   
    data = [       
        {
            name: data[0].Name, y: parseInt(data[0].Count), color: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                    [0, 'rgba(255,114,0,1)'],
                    [1, 'rgba(183,28,28,1)']
                ]
            }
        },
        {
            name: data[1].Name, y: parseInt(data[1].Count), color: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                    [0, 'rgba(255,127,0,1)'],
                    [1, 'rgba(229,57,53,1)']
                ]
            }
        },
        {
            name: data[2].Name, y: parseInt(data[2].Count), color: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                    [0, 'rgba(255,127,0,1)'],
                    [1, 'rgba(239,83,80,1)']
                ]
            }
        },
        {
            name: data[3].Name, y: parseInt(data[3].Count), color: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                    [0, 'rgba(230,255,46,1)'],
                    [1, 'rgba(160,157,53,1)']
                ]
            }
        },
        {
            name: data[4].Name, y: parseInt(data[4].Count), color: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                    [0, 'rgba(104,255,38,1)'],
                    [1, 'rgba(46,139,44,1)']
                ]
            }
        }
    ];

    Highcharts.chart('mostAssignedtoUsersChart', {
        title: {
            text: 'My chart'
        },
        chart: {
            type: 'bar',            
            //width: (100) + '%',
        },
        title: {
            text: ''
        },
        credits:
        {
            enabled: false
        },
        legend: {
            enabled: false
        },
        yAxis: {
            title: {
                text: ''
            }
        },

        xAxis: {
            type: 'category',
            min: 0,
            labels: {
                animate: true
            }
        },

        series: [{
            name: '',
            dataSorting: {
                enabled: true,
                sortKey: 'y'
            },
            data: data
        }]
    });

    return "okay";
}

window.downloadIncidentFile = (baseUrl, file) => {
    //console.log(file);
    window.open(
        baseUrl + "/Incidents/DownloadFile?"
        + "type=incident"
        + "&commentId=" + ""
        + "&incidentId=" + file.incidentId
        + "&filename=" + file.fileName
        + "&contentType=" + file.contentType
    );
    return "Ok";
}

window.downloadCommentFile = (baseUrl, incidentId, file) => {
    window.open(
        baseUrl + "/Incidents/DownloadFile?" +
        "type=comment" +
        "&commentId=" + file.commentId +
        "&incidentId=" + incidentId +
        "&filename=" + file.fileName +
        "&contentType=" + file.contentType
    );
    return "Ok";
}

window.addComment = async (baseUrl,commentText, commentFilesId, incidentId, userId) => {
  
    let files = $("#" + commentFilesId).prop('files'); 

    if (commentText.trim() === "") {
        alert("Please add comment first.");
        return;
    }
    const formData = new FormData();

    if (files) {
        for (let i = 0; i < files.length; i++) {
            formData.append(
                "Attachment" + i + 1,
                files[i],
                files[i].name
            );
        }
    }
    formData.append("CommentText", commentText.trim());
    formData.append("IncidentId", incidentId);
    formData.append("UserId", userId);
    
    let url = baseUrl + "/Incidents/AddComment";

   let res = await fetch(url, {
        method: 'post',
        headers: new Headers({ 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")) }),
        body: formData,
    })
       .then(res => res.json()).then(res => {     
           $("#" + commentFilesId).val(null);
            $("#" + commentFilesId).replaceWith($("#" + commentFilesId).clone(true));
            $("#commentFileuploadInfo").html("Click here to upload files");
        return res;
    }).catch(err => console.log(err));

    return res;
}