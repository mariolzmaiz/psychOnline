import * as jspsych from "./online-psychophysics/jspsych-psychophysics-master/js/jspsych.js";
import * as psychophysics from "./online-psychophysics/jspsych-psychophysics-master/jspsych-psychophysics.js";
import * as preloaded from "./online-psychophysics/jspsych-psychophysics-master/js/jspsych-preload.js";
import * as htmlButton from "./online-psychophysics/jspsych-psychophysics-master/js/jspsych-html-button-response.js";
        

    const timeList = [];
      // This file demonstrates how to specify the keyboard-event functions.

      let current_color = 0;

      var circle_obj = {
          obj_type: 'circle',
          startX: 'center',
          startY: 'center',
          radius: 150,
          line_color: 'white',
          fill_color: `${current_color}`,
          line_width: 5,
      };
      
    const sounds = [ // All the sound files used in this demo
        './online-psychophysics/jspsych-psychophysics-master/demos/sound/tone100ms.wav',
        './online-psychophysics/jspsych-psychophysics-master/demos/sound/880Hz_100ms.wav'
    ];

    // Preloading files are needed to present the stimuli accurately.
    const preload = {
        type: 'preload',
        audio: sounds,
    }

      var trial = {
      
      
      timeline: [
            {
                type: 'psychophysics',
                stimuli: [
                    {
                        obj_type: 'sound',
                        file: jsPsych.timelineVariable('first_sound'),
                        show_start_time: 800 // from the trial start (ms)
                    },
                    {
                        obj_type: 'sound',
                        file: jsPsych.timelineVariable('second_sound'),
                        show_start_time: 1600 // from the trial start (ms)
                    },
                    {
                        obj_type: 'sound',
                        file: jsPsych.timelineVariable('third_sound'),
                        show_start_time: 2400 // from the trial start (ms)
                    },
                    {
                        obj_type: 'sound',
                        file: jsPsych.timelineVariable('first_sound'),
                        show_start_time: 3200 // from the trial start (ms)
                    },
                    {
                        obj_type: 'sound',
                        file: jsPsych.timelineVariable('second_sound'),
                        show_start_time: 4000 // from the trial start (ms)
                    },
                    {
                        obj_type: 'sound',
                        file: jsPsych.timelineVariable('third_sound'),
                        show_start_time: 4800 // from the trial start (ms)
                    },
                ], 
                data: [],
                prompt: 'Press the Y or N key to respond.',
                canvas_height: 500,
                response_type: 'key',
                choices: [' '],
                trial_duration: 9000,
                response_ends_trial: false,
                on_finish: function(trial) {
                    jsPsych.data.addProperties(timeList);
                     console.log(timeList);
                },
                key_down_func: function(event){ // The key_up_func is also available. In that case, the color of the circle changes when you release the key. 
                    jsPsych.data.addProperties({times: event.timeStamp});
                    timeList.push(event.timeStamp);
                    if (event.key === 'ArrowUp'){
                        current_color = "white";
                        console.log(event.timeStamp);
                    }
                }
            },
        ],
        timeline_variables:[
            {first_sound: sounds[1], second_sound: sounds[1], third_sound: sounds[1]}
        ],
    }
      
    

    var pre_audio = {
        type: 'html-button-response',
        stimulus: 'Recent versions of Chrome require the user to interact with a page before it can play audio. '+
        'Clicking the button below counts as an interaction. Be aware of this when planning audio experiments if '+
        'you want the first trial to include audio.',
        choices: ['Continue']
    }

    jsPsych.init({
        timeline: [preload, pre_audio, trial],
        on_finish: function(){
            jsPsych.data.displayData();
            const url = "https://script.google.com/macros/s/AKfycbxwNw0FlJftm7NeuLHy4anEoHaFSZDq3nOoOoyKgTul9Qgz-NHoQgIukaN_MzBY4zfMxA/exec";
            jsPsychSheet.uploadData(url, jsPsych.data.get().csv())
        }
    });

    
    // AKfycbxwNw0FlJftm7NeuLHy4anEoHaFSZDq3nOoOoyKgTul9Qgz-NHoQgIukaN_MzBY4zfMxA
    // https://script.google.com/macros/s/AKfycbxwNw0FlJftm7NeuLHy4anEoHaFSZDq3nOoOoyKgTul9Qgz-NHoQgIukaN_MzBY4zfMxA/exec   
