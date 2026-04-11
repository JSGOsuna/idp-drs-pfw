def test_login_vacio(page):
    page.goto("http://localhost:3000/")
    page.click("#btnLoginInicio")
    page.click("#btnEntrarLogin")
    assert "http://localhost:3000/" in page.url
    
def test_login_sin_usuario(page):
    page.goto("http://localhost:3000/")
    page.click("#btnLoginInicio")
    page.fill("#campoPassword", "password123")
    page.click("#btnEntrarLogin")
    assert "http://localhost:3000/" in page.url

def test_login_sin_contraseña(page):    
    page.goto("http://localhost:3000/")
    page.click("#btnLoginInicio")
    page.fill("#campoUsuario", "usuario123")
    page.click("#btnEntrarLogin")
    assert "http://localhost:3000/" in page.url   

def test_login_credenciales_incorrectas(page):
    page.goto("http://localhost:3000/")
    page.click("#btnLoginInicio")
    page.fill("#campoUsuario", "usuario123")
    page.fill("#campoPassword", "password123")
    page.click("#btnEntrarLogin")
    assert "http://localhost:3000/" in page.url    

def test_login_exitoso(page):
    page.goto("http://localhost:3000/")
    page.click("#btnLoginInicio")
    page.fill("#campoUsuario", "Jorge Guerrero")
    page.fill("#campoPassword", "1190776")
    page.click("#btnEntrarLogin")
    page.wait_for_url("http://localhost:3000/order")
    assert "http://localhost:3000/order" in page.url    