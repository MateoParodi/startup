function getRepository(){


    var containerList = document.getElementById("repoList");
    containerList.innerHTML = '';
    $.ajax({
        url: "https://api.github.com/search/repositories",
        type: 'GET',
        data: "q=" + document.getElementById("repo").value,


        success: function(data){
            $.each(data.items, function(x, repo){
                var li = document.createElement("li");
                containerList.appendChild(li);
                var data = document.createTextNode(repo.full_name);
                li.appendChild(data);
            });

        },
        error: function(response){
            alert(response);
        }
    });

}