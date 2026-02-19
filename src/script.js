const openBtn = document.getElementById('newAdd')

if (openBtn) {
  openBtn.addEventListener('click', () => {
    const modal = document.getElementById(openBtn.dataset.modal)
    const show = modal?.showModal ?? modal?.show

    if (typeof show === 'function') show.call(modal)
  })
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.close-modal')
  if (!btn) return

  const modal = document.getElementById(btn.dataset.modal) || btn.closest('dialog')
  if (modal && typeof modal.close === 'function') modal.close()
})