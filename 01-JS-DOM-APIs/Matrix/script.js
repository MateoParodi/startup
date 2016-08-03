 function matrix(){

        var matrix = [];
        for(var i=0; i<3; i++) {
            matrix[i] = new Array(3);
        }

        matrix[0][0] = document.getElementById("col1").value;
        matrix[0][1] = document.getElementById("row1a").value;
        matrix[0][2] = document.getElementById("row1b").value;
        matrix[1][0] = document.getElementById("col2").value;
        matrix[1][1] = document.getElementById("row2a").value;
        matrix[1][2] = document.getElementById("row2b").value;
        matrix[2][0] = document.getElementById("col3").value;
        matrix[2][1] = document.getElementById("row3a").value;
        matrix[2][2] = document.getElementById("row3b").value;

        var container = document.getElementById("container");
        var table = document.createElement("table");
        container.appendChild(table);



        //FIRST RAW//

        var tr = document.createElement("tr");
        table.appendChild(tr);
        ///////////////////////////////////////////
        var td = document.createElement("td");
        tr.appendChild(td);
        var data1 = document.createTextNode(matrix[0][0]);
        td.appendChild(data1);
        ///////////////////////////////////////////
        var td2 = document.createElement("td");
        tr.appendChild(td2);
        var data2 = document.createTextNode(matrix[0][1]);
        td2.appendChild(data2);
        ///////////////////////////////////////////
        var td3 = document.createElement("td");
        tr.appendChild(td3);
        var data3 = document.createTextNode(matrix[0][2]);
        td3.appendChild(data3);



        //SECOND ROW//



        var tr2 = document.createElement("tr");
        table.appendChild(tr2);
        ///////////////////////////////////////////
        var td4 = document.createElement("td");
        tr2.appendChild(td4);
        var data4 = document.createTextNode(matrix[1][0]);
        td4.appendChild(data4);
        ///////////////////////////////////////////
        var td5 = document.createElement("td");
        tr2.appendChild(td5);
        var data5 = document.createTextNode(matrix[1][1]);
        td5.appendChild(data5);
        ///////////////////////////////////////////
        var td6 = document.createElement("td");
        tr2.appendChild(td6);
        var data6 = document.createTextNode(matrix[1][2]);
        td6.appendChild(data6);


        //THIRD ROW//

        var tr3 = document.createElement("tr");
        table.appendChild(tr3);
        ///////////////////////////////////////////
        var td7 = document.createElement("td");
        tr3.appendChild(td7);
        var data7 = document.createTextNode(matrix[2][0]);
        td7.appendChild(data7);
        ///////////////////////////////////////////
        var td8 = document.createElement("td");
        tr3.appendChild(td8);
        var data8 = document.createTextNode(matrix[2][1]);
        td8.appendChild(data8);
        ///////////////////////////////////////////
        var td9 = document.createElement("td");
        tr3.appendChild(td9);
        var data9 = document.createTextNode(matrix[2][2]);
        td9.appendChild(data9);

    }
