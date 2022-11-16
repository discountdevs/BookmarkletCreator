function createBookmarklet() {
  var title = document.querySelector("#title").value;
  var desc = document.querySelector("#desc").value;
  var icon = document.querySelector("#icon").value;
  var tags = document.querySelector("#tags").value;
  var external = document.querySelector("#external").value;

  if (external == "") {
    var output = "javascript:" + encodeURIComponent("(function(){" + minify(editor.getValue()).code + "})();");
  } else {
    var output = "javascript:" + encodeURIComponent(("(function(){var a = document.createElement('script');a.src = '{external}';document.childNodes[0].appendChild(a);" + minify(editor.getValue()).code + "})();").replace("{external}", external))
    
  }
  

  var template_full = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
<DT><A HREF="{url}" ADD_DATE="1414706885" ICON="{icon}" PRIVATE="0" TAGS="{tags}">{name}</A>
<DD>{desc}
</DL><p>`;

  var template_iconless = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
<DT><A HREF="{url}" ADD_DATE="1414706885" PRIVATE="0" TAGS="{tags}">{name}</A>
<DD>{desc}
</DL><p>`;

  var using_bookmarkfile = false;

  if (desc != "" || icon != "" || tags != "") {
    console.log("Using bookmark file instead of bookmarklet format");
    using_bookmarkfile = true;
  }

  if (!using_bookmarkfile) {
    
    document.getElementById("output").innerText = output;
    document.getElementById("linkoutput").href = output;
    if (title != "") {
      document.getElementById("linkoutput").innerText = title;
    } else {
      document.getElementById("linkoutput").innerText = "New Bookmarklet";
    }
    
  } else {
    
    var template = template_full;
    var iconless = false;

    if (icon == "") {
      template = template_iconless;
      iconless = true;
    }

    if (desc == "") {
      desc = "[user was too lazy to specify proper description]";
    }

    if (iconless) {
      var outputfile = template.replace("{url}", output).replace("{tags}", tags).replace("{desc}", desc).replace("{name}", title);
    } else {
      var outputfile = template.replace("{url}", output).replace("{tags}", tags).replace("{desc}", desc).replace("{name}", title).replace("{icon}", icon);
    }


    
    document.getElementById("output").innerText = "The file should download automatically. If it doesn't, oh well, you tried.";
    
    var c = document.createElement("a");
    c.download = "bookmarklet-export.html";
    
    var t = new Blob([outputfile], {
    type: "text/plain"
    });
    c.href = window.URL.createObjectURL(t);
    c.click();
    
  }
}