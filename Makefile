.DEFAULT_GOAL := help

backend-%:
	@$(MAKE) -C ./backend $*

frontend-%:
	@$(MAKE) -C ./frontend $*

help:
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@$(MAKE) backend-help
	# @$(MAKE) frontend-help
	@echo ""
	