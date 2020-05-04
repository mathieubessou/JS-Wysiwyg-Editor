# JS-Wysiwyg-Editor

## Example of use
```
<script src="/JS-Wysiwyg-Editor/Editor.js"></script>
<script>
    window.addEventListener("load", function(e) { loadContent('<?= $content ?>') });
</script>
<form action="" method="POST" id="JWE_form">
    <?php include_once '/JS-Wysiwyg-Editor/EditorView.html'; ?>
    <br>
    <button id="JWE_validate" type="submit">Save</button>
</form>
```
