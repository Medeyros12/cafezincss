import { updateAllFields } from "./elements/fields";
import { updateAllSliders } from "./elements/sliders";
import { updateMode, updateTheme } from "./helpers/theme";
import { addClass, guid, hasClass, hasTag, onWeak, query, queryAll, removeClass, updateAllClickable } from "./utils";
import { updateDialog } from "./elements/dialogs";
import { updateMenu } from "./elements/menus";
import { updateSnackbar } from "./elements/snackbars";
import { updatePage } from "./elements/pages";
import { updateAllRipples } from "./helpers/ripples";
import { updateAllProgress } from "./elements/progress";

const _context = globalThis;
let _timeoutMutation;
let _mutation;

function onMutation() {
  if (_timeoutMutation) clearTimeout(_timeoutMutation);
  _timeoutMutation = setTimeout(async () => await _ui(), 180);
}

async function run(from, to, options, e) {
  if (!to) {
    to = query(from.getAttribute("data-ui"));
    if (!to) {
      from.classList.toggle("active");
      return;
    }
  }

  updateAllClickable(from);

  if (hasTag(to, "dialog")) {
    await updateDialog(from, to);
    return;
  }

  if (hasTag(to, "menu")) {
    updateMenu(from, to, e);
    return;
  }

  if (hasClass(to, "snackbar")) {
    updateSnackbar(to, options);
    return;
  }

  if (hasClass(to, "page")) {
    updatePage(to);
    return