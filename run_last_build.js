var request = require("request")

// entry point for the aws lamda
exports.run_last_build = function(event, context, callback) {
  var website_project_id = process.env.PROJECT_ID
  var api_key = process.env.API_KEY

  // todo: should really pass a callback in here rather than call run_build from within get_last_build
  get_last_build(website_project_id, api_key)
}

// get the last build id for the project
function get_last_build(project_id, api_key){
  var project_url = "https://codeship.com/api/v1/projects/" + project_id + ".json?api_key=" + api_key
  request(project_url,
    function(error, response, body){
      var json_data = JSON.parse(body)
      build_id = json_data.builds[0].id
      run_build(build_id, api_key)
  })
}

// run the last build
function run_build(build_id, api_key) {
  var build_url = "https://codeship.com/api/v1/builds/" + build_id + "/restart.json?api_key=" + api_key
  request({uri: build_url,
            method: "POST"},
    function(error, response, body){
    })
}
