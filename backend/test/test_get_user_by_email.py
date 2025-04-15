#python3 -m pytest test/test_get_user_by_email.py

import pytest
from unittest.mock import MagicMock
from src.controllers.usercontroller import UserController

@pytest.fixture
def mock_dao():
    return MagicMock()

@pytest.fixture
def controller(mock_dao):
    return UserController(dao=mock_dao)

def test_valid_email_single_user(controller, mock_dao):
    mock_user = {"email": "user@example.com"}
    mock_dao.find.return_value = [mock_user]
    assert controller.get_user_by_email("user@example.com") == mock_user

def test_valid_email_multiple_users(controller, mock_dao, capsys):
    mock_users = [{"email": "user@example.com"}, {"email": "user@example.com"}]
    mock_dao.find.return_value = mock_users
    result = controller.get_user_by_email("user@example.com")
    captured = capsys.readouterr()
    assert result == mock_users[0]
    assert "more than one user found" in captured.out

def test_valid_email_no_user(controller, mock_dao):
    mock_dao.find.return_value = []
    assert controller.get_user_by_email("nouser@example.com") is None

def test_invalid_email(controller):
    with pytest.raises(ValueError):
        controller.get_user_by_email("invalid-email")

def test_dao_exception(controller, mock_dao):
    mock_dao.find.side_effect = Exception("DB error")
    with pytest.raises(Exception):
        controller.get_user_by_email("user@example.com")
