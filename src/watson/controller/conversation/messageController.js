// Send message to assistant
exports.sendMessage = (req, res) => {
  services.sendMessage(req.body.session_id, req.body.text, 'text')
    .then((data) => {
      return res.json(data)
    })
    .catch((err) => {
      return res.status(err.code).json(err); 
    })
}
