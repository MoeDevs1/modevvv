// Keep playback inline and limit motion to one preview at a time.
const cards = [...document.querySelectorAll('.project')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const videos = cards.map(card => card.querySelector('video'));
const play = video => {
  videos.forEach(other => { if (other !== video) other.pause(); });
  video.play().catch(() => {});
};
cards.forEach(card => {
  const video = card.querySelector('video');
  const button = card.querySelector('.preview-hint');
  const name = card.querySelector('h3').textContent;
  const update = () => {
    button.textContent = video.paused ? 'Play preview ▶' : 'Pause preview Ⅱ';
    button.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${name} preview`);
    button.setAttribute('aria-pressed', String(!video.paused));
  };
  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  button.addEventListener('click', () => {
    card.dataset.interacted = 'true';
    if (video.paused) play(video); else video.pause();
  });
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const card = entry.target;
      const video = card.querySelector('video');
      if (!entry.isIntersecting) video.pause();
      else if (card === cards[0] && !card.dataset.interacted && !reducedMotion.matches && !document.hidden) {
        card.dataset.interacted = 'true';
        play(video);
      }
    });
  }, { threshold:0.4 });
  cards.forEach(card => observer.observe(card));
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) videos.forEach(video => video.pause());
});
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) videos.forEach(video => video.pause());
});

// Compose an email with the form details. This does not send automatically.
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const details = new FormData(this);
  const body = [
    `Name: ${details.get('name')}`,
    `Email: ${details.get('email')}`,
    `Business: ${details.get('business')}`,
    '',
    details.get('message'),
  ].join('\n');

  const subject = encodeURIComponent(`Website inquiry from ${details.get('name')}`);
  window.location.href = `mailto:hello@moedevs.com?subject=${subject}&body=${encodeURIComponent(body)}`;
});
