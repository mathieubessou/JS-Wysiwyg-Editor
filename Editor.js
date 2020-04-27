window.addEventListener("load", function() {
    // Récupération de la balise DIV de l'éditeur
    var editor = document.getElementById("JWE_inputContent");
    // Ajouter une balise P si l'éditeur est vide
    if (!editor.innerHTML || editor.innerHTML.length === 0 || !editor.innerHTML.trim() || editor.innerHTML.match(/^ *<br> *$/i)) editor.innerHTML = '<p><br></p>';
    // insertion de la boîte de dialogue dans le code HTML
    InsertDialog();
    // Evènement Input sur l'éditeur
    editor.oninput = function() {
        // Ajouter une balise P si l'éditeur est vide
        if (editor.innerHTML == "") editor.innerHTML = '<p><br></p>';

        var cNode = GetContainerNode();
        var s = document.getSelection();
        var offsetCache = s.focusOffset;
        // Suppréssion des SPAN (créé à cause d'un bug:
        // 1 - Ecrire du texte.
        // 2 - Sélectionner la partie la plus à gauche du texte.
        // 3 - Appuyer sur la touche "Enter" pour repousser le texte d'une ligne.
        // 4 (fin) - Appuyer sur la touche "Back".
        if (deleteSpanOnInput && editor.innerHTML.match(/<span [^>]*>/i)) {
            if (cNode.innerHTML.match(/<span [^>]*>/i)) {
                var newRange = document.createRange();
                newRange.selectNodeContents(cNode);
                var winSelection = window.getSelection();
                winSelection.removeAllRanges();
                winSelection.addRange(newRange);
                //cNode.innerHTML = cNode.innerHTML.replace(/<span [^>]*>((?:.(?<!(?:<br>)?<\/span>))*)(?:<br>)?<\/span>(?:<br>)?/i, '$1');
                var html = cNode.innerHTML.replace(/<span [^>]*>((?:.(?<!(?:<br>)?<\/span>))*)(?:<br>)?<\/span>(?:<br>)?/i, '$1');
                document.execCommand('insertHTML', false, html);
            }
            if (editor.innerHTML.match(/<span [^>]*>/i)) {
                //editor.innerHTML = editor.innerHTML.replace(/<span [^>]*>((?:.(?<!(?:<br>)?<\/span>))*)(?:<br>)?<\/span>(?:<br>)?/ig);
            }
            var newRange = document.createRange();
            newRange.setStart(cNode, offsetCache);
            var winSelection = window.getSelection();
            winSelection.removeAllRanges();
            winSelection.addRange(newRange);
        }

        //document.getElementById("preview").innerHTML = html_specalEncode(document.getElementById("JWE_inputContent").innerHTML);
    }
    // Ne pas coller les éléments de styles
    editor.addEventListener("paste", function(e) {
        // Annuler le collage.
        e.preventDefault();
        // Récupération du text brut dans le presse-papier
        var event = e.originalEvent != null ? e.originalEvent : e;
        var text = event.clipboardData.getData('text/plain');
        // Insérer chaque ligne dans une balise P
        text = text.replace(/(.+)/ig, '<p>$1</p>');
        // Correction d'un bug... La récupération du text créer parfois un caractère invisible (après de longue recherche, il sagirait de \r\n). A cause de lui, le code ne voulais pas s'afficher dans l'éditeur.
        text = text.replace(/[\r\n]+/ig, '<p><br></p>')
        // Remplacement des "<p></p>" par "<p><br></p>"
        text = text.replace(/<p><\/p>/ig, '');
        // Ajout du texte à l'emplacement de la sélection (remplace la sélection)
        document.execCommand("insertHTML", false, text);
    });
    // Evènement click sur le bouton VALIDER. Permet de néttoyer le code avant l'enregistrement
    document.getElementById("JWE_validate").onclick = function() {
        var content = document.getElementById("JWE_inputContent").innerHTML;
        content = content
        // Suppréssion des SPAN (créé à cause d'un bug:
        // 1 - Ecrire du texte.
        // 2 - Sélectionner la partie la plus à gauche du texte.
        // 3 - Appuyer sur la touche "Enter" pour repousser le texte d'une ligne.
        // 4 (fin) - Appuyer sur la touche "Back".
        .replace(/<span [^>]*>((?:.(?<!(?:<br>)?<\/span>))*)(?:<br>)?<\/span>(?:<br>)?/ig, '$1')
        // Remplace les conteneur vide par la balise de saut de ligne <br>.
        .replace(/<(p|div)><br><\/(p|div)>/mg, '<br>')
        // Remplace les balises <!> par <strong> inséré via le bouton "Important!".
        .replace(/&lt;(\/?)[!]&gt;/mg, '<$1strong>');
        document.getElementById("JWE_outputContent").value = content;
        //document.getElementById("preview").innerHTML = html_specalEncode(content);
    }
    // Utiliser la balise P au lieu de DIV
    document.execCommand('defaultParagraphSeparator', false, 'p');
});

var deleteSpanOnInput = true; // Indique qu'il faut supprimer les spans dans le texte après chaque entrée/modification dans l'éditeur

// Utiliser cette méthode pour charger le contenu dans l'éditeur
function loadContent(content) {
    // Remplacer les balises <br> par <p><br></p> pour éviterles bug
    content = content.replace(/<br>/ig, '<p><br><\/p>');
    document.getElementById("JWE_inputContent").innerHTML = content;
    // Récupération de la balise DIV de l'éditeur
    var editor = document.getElementById("JWE_inputContent");
    // Ajouter une balise P si l'éditeur est vide
    if (!editor.innerHTML || editor.innerHTML.length === 0 || !editor.innerHTML.trim() || editor.innerHTML.match(/^ *<br> *$/i)) editor.innerHTML = '<p><br></p>';
}

function InsertDialog() {
    // Boîte de dialogue pour le paramétrage du tableau à ajouter
    var d = document.createElement('div');
    d.innerHTML += `<dialog id="diagForm" onClose="onCloseDialogForm();">
    <form method="dialog">
        <label for="diagForm_rowNumber">Number of rows</label>
        <select id="diagForm_rowNumber" onChange="onChangeDiagFormRowNumber();">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        </select>
        <label for="diagForm_columnNumber">Number of columns</label>
        <select id="diagForm_columnNumber" onChange="onChangeDiagFormColumnNumber();">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>
        
        <label>Header</label>
        <select id="diagForm_header" onChange="onChangeDiagFormHeader();">
        <option value="without">Without</option>
        <option value="firstRow">First row</option>
        <option value="firstColumn">First column</option>
        <option value="firstRowAndfirstColumn">First row and first column</option>
        </select>
        
        <menu>
        <button value="cancel">Cancel</button>
        <button id="diagForm_btnValidate" value="ok">Validate</button>
        </menu>
    </form>
</dialog>`;

    document.getElementById("JWE_form").after(d);
}

/* Boîte de dialogue pour l'ajout de formulaire */
var diagForm_rowNumberValue = 1;
var diagForm_columnNumberValue = 1;
var diagForm_headerValue = "without";
var diagForm_nodefocusCache; // Mise en mémoire du noeud où se trouvait le focus dans l'éditeur avant d'avoir cliqué sur le bouton "Form".
var diagForm_offsetfocusCache; // Mise en mémoire de la position sur le noeud où se trouvait le focus dans l'éditeur avant d'avoir cliqué sur le bouton "Form".
var diagForm_containerNodeCache;// Mise en mémoire du noeud CONTENEUR où se trouvait le focus dans l'éditeur avant d'avoir cliqué sur le bouton "Form".
// Ouvre la boîte de dialogue
function openDialogForm() {
    if (typeof diagForm.showModal === "function") {
        // Réinitialisation des variables
        diagForm_rowNumber = 1;
        diagForm_columnNumber = 1;
        diagForm_headerValue = "without";
        diagForm_nodefocusCache = null;
        diagForm_offsetfocusCache = null;
        diagForm_containerNodeCache = null;
        // Mise en mémoire du noeud et de la position sur le noeud où se trouvait le focus dans l'éditeur avant d'avoir cliqué sur le bouton "Form".
        diagForm_containerNodeCache = GetContainerNode();
        var IsEditorSelection = parentIdOfSelectionExists("JWE_inputContent", 10);
        if (!IsEditorSelection || diagForm_containerNodeCache == null) {
            alert('error: dialog001. Vous devez cibler une zone dans l\'éditeur.'); // Ne rien faire si le noeud du conteneur n'est pas trouvé.
            return;
        }
        var s = document.getSelection();
        diagForm_nodefocusCache = s.focusNode;
        diagForm_offsetfocusCache = s.focusOffset;
        // Affichage de la boîte de dialogue
        diagForm.showModal();
    }
    else console.error("The dialog for inserting a form is not supported by your browser.");
}
function onChangeDiagFormRowNumber() {
    var diagForm_rowNumber = document.getElementById('diagForm_rowNumber');
    diagForm_rowNumberValue = diagForm_rowNumber.value;
}
function onChangeDiagFormColumnNumber() {
    var diagForm_columnNumber = document.getElementById('diagForm_columnNumber');
    diagForm_columnNumberValue = diagForm_columnNumber.value;
}
function onChangeDiagFormHeader() {
    var diagForm_header = document.getElementById('diagForm_header');
    diagForm_headerValue = diagForm_header.value;
}
// Lorsque la boîte de dialogue se ferme
function onCloseDialogForm() {
    var diagForm = document.getElementById('diagForm');
    if (diagForm.returnValue == 'ok') {
        createTable(diagForm_rowNumberValue,
            diagForm_columnNumberValue,
            diagForm_headerValue,
            diagForm_containerNodeCache);
    }
}
// Créer une table après le noeud indiqué en paramètre
function createTable(row, col, header, node) {
    if (row == 0 || col == 0 || header == "" || node == null) return;

    var table = document.createElement('table');
    table.contentEditable = false;
    // row
    for (let rIndex = 0; rIndex < row; rIndex++) {
        var tr = document.createElement('tr');
        // td
        for (let cIndex = 0; cIndex < col; cIndex++) {
            var c;
            switch (header) {
                case 'firstRow':
                    if (rIndex == 0) c = document.createElement('th');
                    else c = document.createElement('td');
                    break;
                case 'firstColumn':
                    if (cIndex == 0) c = document.createElement('th');
                    else c = document.createElement('td');
                    break;
                case 'firstRowAndfirstColumn':
                    if (rIndex == 0 || cIndex == 0) c = document.createElement('th');
                    else c = document.createElement('td');
                    break;
            
                default:
                    c = document.createElement('td');
                    break;
            }
            c.contentEditable = true;
            c.innerText = 'texte';
            tr.append(c);
        }

        table.append(tr);
    }
    node.after(table);
}
/* Fin -- Boîte de dialogue pour l'ajout de formulaire */

function removeBrOfNodeOnSelection(nodeName) {
    selection = document.getSelection();
    var offsetCache = selection.focusOffset;
    if (document.getSelection().rangeCount == 0) return;
    node = selection.focusNode;
    var pNode;
    for (var index = 0; index < 12; index++) {
        if (node.id == "JWE_inputContent") return; // Arrêter la function si on atteint les limites de l'éditeur.
        var regxForDelete = new RegExp('^'+nodeName+'$', 'i');
        if (String(node.nodeName).match(regxForDelete)) {
            for (let index = 0; index < node.childNodes.length; index++) {
                const nodeChild = node.childNodes[index];
                if (String(nodeChild.nodeName).toLowerCase() == 'br') {
                    nodeChild.remove();
                }
            }
            break;
        }
        node = node.parentNode;
    }
    return;
}

// 
function GetContainerNode() {
    selection = document.getSelection();
    if (document.getSelection().rangeCount == 0) return null;
    node = selection.focusNode;
    for (var index = 0; index < 15; index++) {
        if (node.id == "JWE_inputContent") return null; // Arrêter la function si on atteint les limites de l'éditeur.
        if (String(node.nodeName).match(/^p|h[123456]|table|div$/i)) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}
// Récupère l'élément UL, parent de la sélection.
function GetUlNode() {
    selection = document.getSelection();
    if (document.getSelection().rangeCount == 0) return null;
    node = selection.focusNode;
    for (var index = 0; index < 15; index++) {
        if (node.id == "JWE_inputContent") return null; // Arrêter la function si on atteint les limites de l'éditeur.
        if (String(node.nodeName).match(/^ul$/i)) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}

// Encode les balises <br> en \n (saut d ligne) et les caractères utilisé pour les balises HTML.
function html_specalEncode(str) {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(&lt;\/?(?:div|p|img|ul|li|table|t[rhd]|h[123])&gt;)/g, "$1<br>") // Balise container..
    .replace(/(&lt;\/(?:div|p|img|ul|li|table|t[rhd]|h[123])&gt;)/g, "<br>$1")
    ;
}
// Décode les caractères utilisé pour les balises HTML et les saut de lignes \n.
function html_decode(str) {
    return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\n/g, "<br>");
}

function insertTag(tagName, selection, secondValue = null, lineBreak = false) {
    if (tagName == null || tagName == "") alert("Une balise doit être défini.");
    var comp = "";
    if (lineBreak) comp = "\n";
    if (secondValue != null) return "<"+tagName+"="+secondValue+">"+comp+selection+comp+"</"+tagName+">";
    else return "<"+tagName+">"+comp+selection+comp+"</"+tagName+">";
}
function removeTag(tagName, selection) {
    if (tagName == null || tagName == "") alert("Une balise à supprimer doit être défini.");
    var regx = new RegExp('< *'+tagName+' *(?:=[^>]*)?>\n?((?:.|\n(?!< *\/ *'+tagName+' *>))*)\n?< *\/ *'+tagName+' *>', 'g');
    return String(selection).replace(regx, "$1");
}
function switchTag(tagName, selection, secondValue = null, lineBreak = false) {
    var str = String(selection);
    if (tagName == null || tagName == "") alert("Une balise doit être défini.");
    var regx = new RegExp('< *'+tagName+' *(?:=[^>]*)?>\n?((?:.|\n(?!< *\/ *'+tagName+' *>))*)\n?< *\/ *'+tagName+' *>', 'g');
    if (str.match(regx)) return removeTag(tagName, selection);
    else return insertTag(tagName, selection, secondValue, lineBreak);
}

// Fonction indiquant si une balise parente contient l'id indiqué en paramètre, dans la plage indiqué.
function parentIdOfSelectionExists(parentId, limit) {
    if (document.getSelection().rangeCount == 0) return false;
    selection = document.getSelection().getRangeAt(0).startContainer;
    if (selection.id != null && selection.id == parentId) return true;
    for (var index = 0; index < limit; index++) {
        selection = selection.parentNode;
        if (selection == null) return false;
        if (selection.id == parentId) {
            return true;
        }
    }
    return false;
}
// Indique si la sélection se trouve dans la base indiqué en paramètre (Ca peut être une balise parente éloigné).
// Si attr défini: Indique si la sélection se trouve dans la balise contenant l'attribut indiqué en paramètre.
// Si attr défini et value défini: Indique si la sélection se trouve dans la balise contenant l'attribut avec la valeur indiqué en paramètre.
// continueIfNotFound=true: Indique qu'il faut continuer à chercher si une balise correspondante est trouvé mais ne contient pas l'attribut ou la valeur recherché.
function IsInTag(tagName, attr = null, value = null, continueIfNotFound = false) {
    // Préparation des fonctions de vérification
    function tagFound(node, tagName) { return String(node.nodeName).toLowerCase() == String(tagName).toLowerCase(); }
    function attrFound(node, attr) { return node.hasAttribute(attr); }
    function attrValueFound(node, attr, value)
    { return node.hasAttribute(attr) && node.getAttribute(attr).valueOf() == value; }

    selection = document.getSelection();
    if (document.getSelection().rangeCount == 0) return false;
    node = selection.focusNode;
    for (var index = 0; index < 15; index++) {
        if (node.id == "JWE_inputContent") return null; // Arrêter la function si on atteint les limites de l'éditeur.
        if (tagFound(node, tagName)) {
            if (attr != null && attr != '' && !attrFound(node, attr)) {
                if (continueIfNotFound) continue;
                else return false;
            }
            if (attr != null && attr != '' && value != null && value != '' && !attrValueFound(node, attr, value)) {
                if (continueIfNotFound) continue;
                else return false;
            }
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

// Sélectionne tout le contenu de chaque noeud sélectionné
function selectAllContentOfSelectedNodes() {
    var selection = document.getSelection();
    var startContainer = selection.getRangeAt(0).startContainer;
    var endContainer = selection.getRangeAt(0).endContainer;
    var newRange = document.createRange();
    newRange.setStartBefore(startContainer);
    newRange.setEndAfter(endContainer);
    var winSelection = window.getSelection();
    winSelection.removeAllRanges();
    winSelection.addRange(newRange);
}

// Retourne un tableau contenant les noeuds sélectionné
function getSelectedNodes() {
    var selection = document.getSelection();
    var OwnerSelectedNodes = selection.getRangeAt(0).commonAncestorContainer; // Noeud contenant les noeuds de la sélection et autre.
    var firstSelectedNode = selection.getRangeAt(0).startContainer;
    var lastSelectedNode = selection.getRangeAt(0).endContainer;
    var firstIsReached = false; // Indique quand le premier noeud de la sélection est atteint
    var selectedNodes = []; // Tableau de noeud à retourner
    var counter = 0;
    var nodeToCheck = OwnerSelectedNodes.childNodes[0];
    while (nodeToCheck) {
        if (nodeToCheck == firstSelectedNode || nodeToCheck.contains(firstSelectedNode))
            firstIsReached = true;
        // Ajout du noeud au tableau si on a atteint les noeuds de la sélection
        if (firstIsReached)
            selectedNodes.push(nodeToCheck);
        // Arrêt de la boucle si on a vient d'ajouter le dernier noeud de la sélection dans le tableau
        if (nodeToCheck == lastSelectedNode || nodeToCheck.contains(lastSelectedNode))
            break;
        // Préparation du noeud suivant
        counter++;
        nodeToCheck = OwnerSelectedNodes.childNodes[counter];
    }
    return selectedNodes;
}

// Sélectionne tout le contenu de chaque noeud. Si le contenu d'une balise UL est à moitié sélectionné; sélectionne quand même toute la balise UL.
function SelectUlAndExternalStringOfSelection() {
    var selection = document.getSelection()
    // Mise en mémoire des noeuds séléctionné
    var startContainer = selection.getRangeAt(0).startContainer;
    var endContainer = selection.getRangeAt(0).endContainer;
    // Si le premier noeud sélectionné fait partie d'une liste déjà présente': Chercher l'élément UL
    if (startContainer.parentNode.parentNode.parentNode.nodeName == 'UL') {
        startContainer = startContainer.parentNode.parentNode.parentNode;
    }
    // Si le dernier noeud sélectionné fait partie de la liste déjà présente: Chercher l'élément UL
    if (endContainer.parentNode.parentNode.parentNode.nodeName == 'UL') {
        endContainer = endContainer.parentNode.parentNode.parentNode;
    };
    var newRange = document.createRange();
    newRange.setStartBefore(startContainer);
    newRange.setEndAfter(endContainer);
    selection.removeAllRanges();
    selection.addRange(newRange);
}

// Sélectionne le noeud indiqué en paramètre
function selectNode(node) {
    var selection = document.getSelection();
    var newRange = document.createRange();
    newRange.selectNode(node);
    selection.removeAllRanges();
    selection.addRange(newRange);
}

function insertTagOnSelection(name, param = null){

    var selection = document.getSelection();
    var hasSelectedText = selection != "";
    var IsEditorSelection = parentIdOfSelectionExists("JWE_inputContent", 10);
    var parentNodeName = String(selection.focusNode.parentNode.nodeName);


    if (!IsEditorSelection) alert("Vous devez sélectionner le texte dans l'éditeur.");

    switch(name){
        case "bold":
            document.execCommand("bold");
            break;
        case "italic":
            document.execCommand("italic");
            break;
        case "underline":
            document.execCommand("underline");
            break;
        case "important":
            document.execCommand("insertText", false, switchTag("!", selection));
            break;
        case "strike":
            document.execCommand("strikeThrough");
            break;
        case "list":
            deleteSpanOnInput = false; // Désactivation temporaire
            // Function qui insert un conteneur P dans les balises li qui n'en contiennent pas
            function AddTagInLI(ulNode, tag) {
                for (var index = 0; index < ulNode.childElementCount; index++) {
                    var liNode = ulNode.childNodes[index];
                    var liNodeContent = liNode.firstChild;
                    if (String(liNodeContent.nodeName).toLowerCase() == String(tag).toLowerCase()) {
                        continue;
                    }
                    var p = document.createElement(tag);
                    p.append(liNodeContent);
                    liNode.append(p);
                }
            }
            // Sélectionner tout le contenu de chaque noeud pour éviter les bugs
            selectAllContentOfSelectedNodes();
            // Mettre en mémoire l'état actuel pour différencier les sélection multiple (une partie de la liste + du texte hors de la liste = insérer le texte dans la liste)
            var isInUlCACHE = IsInTag('UL');

            // List to text
            // Si on vient de transformer une liste en texte
            if (isInUlCACHE) { // Transformer les éléments de liste Li en P
                // Récupération du conteneur de la liste
                var ulNode = selection.focusNode.parentNode.parentNode;
                // Sélectionner toute la liste
                selectNode(ulNode);
                // Préparation du conteneur provisoir pour regrouper les balises P
                var divTemp = document.createElement('div');
                // copier les balises P présentes dans les élément de liste LI, dans divTemp
                var node = ulNode.firstChild;
                var counter = 0;
                while (node) {
                    divTemp.append(node.firstChild.cloneNode(true));
                    counter++;
                    node = ulNode.childNodes[counter];
                }
                // START - Requis pour qu'il n'y ai pas de bug gênant après la suppréssion de la liste...
                var pTmp = document.createElement('p');
                pTmp.append(document.createElement('br'));
                ulNode.before(pTmp); // Indispensable pour pouvoir supprimer la liste d'un coup
                var selection = document.getSelection();
                var newRange = document.createRange();
                newRange.setStartBefore(pTmp);
                newRange.setEndAfter(ulNode);
                selection.removeAllRanges();
                selection.addRange(newRange);
                var pTmp = document.createElement('p');
                pTmp.append(document.createElement('br'));
                ulNode.after(pTmp); // Indispensable pour garder l'espace entre le texte de la liste et les éléments suivants. Empêche aussi l'apparition de SPAN.
                // END - Requis pour qu'il n'y ai pas de bug gênant après la suppréssion de la liste...

                document.execCommand("forwardDelete");

                // Insertion des éléments P à la place de la liste
                document.execCommand('insertHTML', false, divTemp.innerHTML);
            }
            // Text to list && Text+list to list
            else {
                document.execCommand("insertUnorderedList");
                // Text+list to list
                // Si une liste était déjà présente, mais qu'on a ajouté des éléments de liste.
                // isInUlCACHE vaut NULL quand la méthode atteint les limites de l'éditeur.
                if (IsInTag('UL')) {
                    // Récupération du conteneur de la liste
                    var ulNode = selection.focusNode.parentNode.parentNode;
                    // Sélectionner toute la liste
                    selectNode(ulNode);
                    // Mettre en mémoire le noeud de la balise Ul
                    ulNode = ulNode.cloneNode(true);
                    // Désactiver le mode liste pour éviter le bug suivant: Créer une balise ul dans <ul><li><ICI></li></ul>
                    document.execCommand('insertUnorderedList');
                    // Ajout du conteneur P dans les balises li qui n'en contiennent pas
                    AddTagInLI(ulNode, 'p')
                    // Insertion de la liste à la place de la sélection
                    document.execCommand('insertHTML', false, '<ul>'+ulNode.innerHTML+'</ul>');
                }
                // Text to list
                // Si une nouvelle liste vient d'être ajouté : Elle a été placé dans une balise P et il faut corriger celà
                else if (IsInTag('P')) {
                    // Mettre en mémoire le noeud de la balise Ul
                    var pNode = GetContainerNode();
                    var ulNode = pNode.firstChild.cloneNode(true);
                    // Annuler la mise en place de la liste pour ensuite la réinsérer via inserHTML pour éviter les bugs quand on fait CTRL+Z.
                    document.execCommand('undo');
                    // Ajout du conteneur P dans les balises li
                    AddTagInLI(ulNode, 'p')
                    // Insertion de la liste à la place de la sélection
                    document.execCommand('insertHTML', false, '<ul>'+ulNode.innerHTML+'</ul>');
                }
            }
            deleteSpanOnInput = true; // Réactivation
            break;
        case "color":
            document.execCommand("foreColor", false, param);
            break;
        case "decreaseFontSize":
            if (IsInTag('font', 'size', '3')) {
                document.execCommand("removeFormat");
            }
            else {
                document.execCommand("fontSize", false, "3");
            }
            break;
        case "link":
            if (IsInTag('a')) {
                document.execCommand("unlink");
            }
            else {
                argument = prompt("Ecrivez l'adresse du lien :");
                if (argument != null) document.execCommand("createLink", false, argument);
            }
            break;
        case "title":
            if ((param == 'h1' && IsInTag('h1')) ||
            (param == 'h2' && IsInTag('h2')) ||
            (param == 'h3' && IsInTag('h3'))) {
                document.execCommand("formatBlock", false, '<p>');
            }
            else {
                document.execCommand("formatBlock", false, '<'+param+'>');
            }
            break;
        case "align":
            switch (param) {
                case 'left':
                    document.execCommand("justifyLeft");
                    break;
                case 'center':
                    document.execCommand("justifyCenter");
                    break;
                case 'right':
                    document.execCommand("justifyRight");
                    break;
                case 'full':
                    document.execCommand("justifyFull");
                    document.execCommand("styleWithCSS", false, false);
                    break;
            }
            break;
        case "image":
            argument = prompt("Ecrivez l'adresse du lien :");
            if (argument == null || argument == '') return; // Ne rien faire si l'adresse de l'image n'est pas renseigné.

            var dTmp = document.createElement('d');
            var p = document.createElement('p');
            var img = document.createElement('img');
            img.src = argument;
            img.style = " margin: 5px 0px 10px 0px; max-width: 100%;";
            p.append(img);
            var pAfterP = document.createElement('p'); // Pour pouvoir sélectionner/insérer du texte après l'image quand elle se trouve en dernière position.
            pAfterP.append(document.createElement('br'));
            dTmp.append(p);
            dTmp.append(pAfterP);
            document.execCommand('insertHTML', false, dTmp.innerHTML);
            break;
        case "leftImage":
            var containerNode = GetContainerNode();
            if (containerNode == null) return; // Ne rien faire si le noeud du conteneur n'est pas trouvé.
            
            argument = prompt("Ecrivez l'adresse du lien :");
            if (argument == null || argument == '') return; // Ne rien faire si l'adresse de l'image n'est pas renseigné.

            var dTmp = document.createElement('d');
            var p = document.createElement('p');
            var img = document.createElement('img');
            img.src = argument;
            img.style = "float: left; margin: 5px 10px 10px 0px; max-width: 50%;";
            p.append(img);
            dTmp.append(p);
            dTmp.append(containerNode.cloneNode(true));
            selectNode(containerNode);
            document.execCommand('insertHTML', false, dTmp.innerHTML);

            break;
    }
}